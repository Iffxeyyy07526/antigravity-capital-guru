import { Resend } from 'resend'
import {
  getWelcomeEmailHtml,
  getExpiryReminderHtml,
  getExpiredEmailHtml,
  getPasswordResetHtml,
  getRegistrationWelcomeHtml,
} from './email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = `${process.env.RESEND_FROM_NAME || 'The Capital Guru'} <${process.env.RESEND_FROM_EMAIL || 'noreply@thecapitalguru.net'}>`

export async function sendTelegramAccessEmail(data: {
  to: string
  first_name: string
  plan_name: string
  start_date: string
  end_date: string
  amount: string
  telegram_link: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.to,
    subject: '🎯 Your Capital Guru Access is Ready — Join Telegram Now',
    html: getWelcomeEmailHtml(data),
  })
}

export async function sendExpiryReminderEmail(data: {
  to: string
  first_name: string
  plan_name: string
  end_date: string
  days_remaining: 7 | 1
}) {
  const subject = data.days_remaining === 7
    ? '⏰ Your Capital Guru subscription expires in 7 days'
    : '🚨 Last chance — Subscription expires TOMORROW'

  const html = getExpiryReminderHtml(data)

  return resend.emails.send({
    from: FROM,
    to: data.to,
    subject,
    html,
  })
}

export async function sendExpiredEmail(data: {
  to: string
  first_name: string
  plan_name: string
  end_date: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.to,
    subject: 'Your Capital Guru access has expired',
    html: getExpiredEmailHtml(data),
  })
}

export async function sendPasswordResetEmail(data: {
  to: string
  first_name: string
  reset_link: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.to,
    subject: 'Reset your Capital Guru password',
    html: getPasswordResetHtml(data),
  })
}

export async function sendWelcomeEmail(data: {
  to: string
  first_name: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.to,
    subject: 'Welcome to The Capital Guru 👋',
    html: getRegistrationWelcomeHtml(data),
  })
}
