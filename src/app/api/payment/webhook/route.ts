import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')

    if (expected !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const supabase = await createServiceClient()

    switch (event.event) {
      case 'payment.captured': {
        const payment = event.payload.payment.entity

        // Check if subscription already created (idempotent)
        const { data: existing } = await supabase
          .from('payments')
          .select('id')
          .eq('razorpay_payment_id', payment.id)
          .single()

        if (!existing) {
          // Payment was not processed through our verify endpoint
          console.log(`Webhook: payment ${payment.id} captured but not verified yet`)
        }
        break
      }

      case 'payment.failed': {
        const payment = event.payload.payment.entity

        // Update payment status if exists
        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('razorpay_payment_id', payment.id)

        break
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ status: 'ok' }) // Always return 200 to Razorpay
  }
}
