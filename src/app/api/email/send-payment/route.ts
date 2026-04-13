import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withErrorHandler } from '@/lib/api-handler'
import { sendEmail } from '@/lib/email'
import { paymentTemplate } from '@/lib/email-templates'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  amount: z.string(),
  planName: z.string(),
})

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json()
  const { email, name, amount, planName } = schema.parse(body)

  const { success, error } = await sendEmail({
    to: email,
    subject: 'Payment Confirmed ✅',
    html: paymentTemplate({
      name,
      amount,
      plan: planName,
      date: new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })
    }),
  })

  if (!success) {
    return NextResponse.json({ error: 'Failed to send payment email', details: error }, { status: 500 })
  }

  return NextResponse.json({ message: 'Payment confirmation email sent successfully' })
})
