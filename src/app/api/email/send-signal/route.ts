import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withErrorHandler } from '@/lib/api-handler'
import { sendEmail } from '@/lib/email'
import { signalTemplate } from '@/lib/email-templates'

const schema = z.object({
  email: z.string().email(),
  stockName: z.string(),
  entry: z.string(),
  sl: z.string(),
  target: z.string(),
})

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json()
  const { email, stockName, entry, sl, target } = schema.parse(body)

  const { success, error } = await sendEmail({
    to: email,
    subject: 'New Trade Signal 📈',
    html: signalTemplate({
      stock: stockName,
      entry,
      sl,
      target
    }),
  })

  if (!success) {
    return NextResponse.json({ error: 'Failed to send signal email', details: error }, { status: 500 })
  }

  return NextResponse.json({ message: 'Signal alert email sent successfully' })
})
