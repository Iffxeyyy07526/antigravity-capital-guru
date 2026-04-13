import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withErrorHandler } from '@/lib/api-handler'
import { sendEmail } from '@/lib/email'
import { reminderTemplate } from '@/lib/email-templates'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  daysLeft: z.number().int().positive(),
})

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json()
  const { email, name, daysLeft } = schema.parse(body)

  const { success, error } = await sendEmail({
    to: email,
    subject: 'Your Access is Expiring Soon',
    html: reminderTemplate(name, daysLeft),
  })

  if (!success) {
    return NextResponse.json({ error: 'Failed to send reminder email', details: error }, { status: 500 })
  }

  return NextResponse.json({ message: 'Expiry reminder email sent successfully' })
})
