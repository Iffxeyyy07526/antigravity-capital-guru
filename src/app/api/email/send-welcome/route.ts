import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withErrorHandler } from '@/lib/api-handler'
import { sendEmail } from '@/lib/email'
import { welcomeTemplate } from '@/lib/email-templates'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export const POST = withErrorHandler(async (request: Request) => {
  const body = await request.json()
  const { email, name } = schema.parse(body)

  const { success, error } = await sendEmail({
    to: email,
    subject: 'Welcome to The Capital Guru 🚀',
    html: welcomeTemplate(name),
  })

  if (!success) {
    return NextResponse.json({ error: 'Failed to send welcome email', details: error }, { status: 500 })
  }

  return NextResponse.json({ message: 'Welcome email sent successfully' })
})
