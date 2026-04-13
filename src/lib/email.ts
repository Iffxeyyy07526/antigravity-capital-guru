import { Resend } from 'resend'
import { config } from './config'

/**
 * The Capital Guru - Central Email Service
 * High-reliability wrapper for Resend API.
 * Handles:
 * 1. Safe Initialization
 * 2. Logging
 * 3. Fallback / Error Handling
 */

const resend = config.resend.apiKey ? new Resend(config.resend.apiKey) : null

interface EmailPayload {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailPayload) {
  if (!resend) {
    console.warn('[Email] Resend client not initialized - skipping send.')
    return { success: false, error: 'Resend API key missing' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${config.resend.fromName} <${config.resend.fromEmail}>`,
      to,
      subject,
      html,
      text: text || 'This email requires a client that supports HTML.',
    })

    if (error) {
      console.error('[Email] Send error:', error)
      return { success: false, error }
    }

    console.log(`[Email] Successfully sent to ${Array.isArray(to) ? to.join(', ') : to} | Subject: ${subject}`)
    return { success: true, data }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected failure'
    console.error('[Email] Unexpected failure:', error)
    return { success: false, error: message }
  }
}
