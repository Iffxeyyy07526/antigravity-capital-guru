/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'
import { sendTelegramAccessEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
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

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json()

    // Verify signature
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Get order details from Razorpay to find the plan
    const { razorpay: rzpLib } = await import('@/lib/razorpay')
    const order = await rzpLib.orders.fetch(razorpay_order_id)
    const planId = (order.notes as any)?.planId

    if (!planId) {
      return NextResponse.json({ error: 'Plan not found in order' }, { status: 400 })
    }

    // Fetch plan
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    // Calculate dates
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + plan.duration_months)

    // Create subscription
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

    // Create payment record
    await supabase.from('payments').insert({
      user_id: user.id,
      subscription_id: subscription?.id,
      amount_inr: (order.amount as number) / 100,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      status: 'success',
    })

    // Fetch profile for email
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // Send welcome email
    try {
      await sendTelegramAccessEmail({
        to: user.email!,
        first_name: profile?.full_name?.split(' ')[0] || 'Trader',
        plan_name: plan.name,
        start_date: startDate.toLocaleDateString('en-IN'),
        end_date: endDate.toLocaleDateString('en-IN'),
        amount: ((order.amount as number) / 100).toLocaleString(),
        telegram_link: plan.telegram_group_link,
      })
    } catch (emailErr) {
      console.error('Email send error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Verify payment error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
