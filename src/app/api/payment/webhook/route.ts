import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'
import { withErrorHandler } from '@/lib/api-handler'
import { config } from '@/lib/config'

/**
 * The Capital Guru - Razorpay Webhook Engine
 * Handles background events:
 * 1. payment.captured (Backup processing)
 * 2. payment.failed (Notification & Log)
 */

export const POST = withErrorHandler(async (req: Request) => {
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  // 1. Rigorous Signature Verification
  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.webhookSecret!)
    .update(body)
    .digest('hex')

  if (expectedSignature !== signature) {
    console.warn('[Webhook] Invalid signature attempt detected.')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body)
  const supabase = await createServiceClient()

  console.log(`[Webhook] Event Received: ${event.event}`)

  switch (event.event) {
    case 'payment.captured': {
      const payment = event.payload.payment.entity
      
      // Secondary check to ensure payment record exists
      const { data: existing } = await supabase
        .from('payments')
        .select('id')
        .eq('razorpay_payment_id', payment.id)
        .single()

      if (!existing) {
        console.log(`[Webhook] Manual Capture: Detected payment ${payment.id} not yet verified by frontend.`)
        // Note: Production-grade apps might trigger a worker here to verify if the frontend fetch failed.
      }
      break
    }

    case 'payment.failed': {
      const payment = event.payload.payment.entity
      await supabase
        .from('payments')
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .eq('razorpay_payment_id', payment.id)
      
      console.log(`[Webhook] Payment Failed: ${payment.id}`)
      break
    }
  }

  // Always return 200 to Razorpay within 2 seconds
  return NextResponse.json({ status: 'ok' })
})
