import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { withErrorHandler } from '@/lib/api-handler'
import { sendEmail } from '@/lib/email'
import { paymentTemplate, welcomeTemplate } from '@/lib/email-templates'
import { config } from '@/lib/config'

const schema = z.object({
  razorpay_payment_id: z.string(),
  razorpay_order_id: z.string(),
  razorpay_signature: z.string(),
})

export const POST = withErrorHandler(async (req: Request) => {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const supabase = await createServiceClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = schema.parse(body)

  // 1. Verify Signature
  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.keySecret!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
  }

  // 2. Fetch Order from Razorpay
  const { razorpay: rzpLib } = await import('@/lib/razorpay')
  const order = await rzpLib.orders.fetch(razorpay_order_id)
  const planId = (order.notes as Record<string, string> | undefined)?.planId

  if (!planId) {
    return NextResponse.json({ error: 'Plan identification failed' }, { status: 400 })
  }

  // 3. Fetch Plan & Profile
  const [planResult, profileResult] = await Promise.all([
    supabase.from('subscription_plans').select('*').eq('id', planId).single(),
    supabase.from('profiles').select('*').eq('id', user.id).single()
  ])

  const plan = planResult.data
  const profile = profileResult.data

  if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

  // 4. Idempotency Check
  const { data: existingSub } = await supabase
    .from('user_subscriptions')
    .select('id')
    .eq('razorpay_payment_id', razorpay_payment_id)
    .single()

  if (existingSub) {
    return NextResponse.json({ message: 'Payment already processed' })
  }

  // 5. Subscription Lifecycle Calculation
  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + plan.duration_months)

  // 6. Database Updates (Transaction-like)
  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .insert({
      user_id: user.id,
      plan_id: plan.id,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      status: 'active',
      razorpay_payment_id,
      razorpay_order_id,
      telegram_link_sent: false,
    })
    .select()
    .single()

  await supabase.from('payments').insert({
    user_id: user.id,
    subscription_id: subscription?.id,
    amount_inr: (order.amount as number) / 100,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    status: 'success',
  })

  // 7. Success Communication
  const firstName = profile?.full_name?.split(' ')[0] || 'Trader'
  const amountStr = ((order.amount as number) / 100).toLocaleString()

  // Trigger emails in parallel (background)
  Promise.all([
    sendEmail({
      to: user.email!,
      subject: 'Payment Confirmed ✅',
      html: paymentTemplate({
        name: firstName,
        amount: amountStr,
        plan: plan.name,
        date: startDate.toLocaleDateString('en-IN', { dateStyle: 'long' })
      })
    }),
    sendEmail({
      to: user.email!,
      subject: 'Welcome to The Capital Guru 🚀',
      html: welcomeTemplate(firstName)
    })
  ]).catch(err => console.error('[Verify] Email failure:', err))

  return NextResponse.json({ success: true })
})
