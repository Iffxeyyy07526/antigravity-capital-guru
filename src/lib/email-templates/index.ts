const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0F0F0F;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F0F0F;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Logo Header -->
          <tr>
            <td style="padding:24px 0;text-align:center;">
              <span style="font-size:22px;font-weight:700;color:#F8F8F8;font-family:Arial,sans-serif;">
                The Capital <span style="color:#5DD62C;">Guru</span>
              </span>
            </td>
          </tr>
          <!-- Content Card -->
          <tr>
            <td style="background-color:#202020;border:1px solid #2d2d2d;border-radius:12px;padding:36px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 0;text-align:center;">
              <p style="color:#888888;font-size:12px;line-height:1.6;margin:0;">
                ⚠️ The Capital Guru does not provide SEBI-registered investment advice.<br>
                All signals are for educational purposes only. Trade at your own risk.
              </p>
              <p style="color:#888888;font-size:11px;margin:16px 0 0;">
                © 2025 The Capital Guru. All rights reserved.<br>
                <a href="https://thecapitalguru.net" style="color:#5DD62C;text-decoration:none;">thecapitalguru.net</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

const ctaButton = (text: string, link: string) => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr>
    <td align="center">
      <a href="${link}" style="display:inline-block;background-color:#5DD62C;color:#0F0F0F;font-weight:700;padding:14px 32px;border-radius:9999px;text-decoration:none;font-size:16px;font-family:Arial,sans-serif;">${text}</a>
    </td>
  </tr>
</table>`

export function getWelcomeEmailHtml(data: {
  first_name: string
  plan_name: string
  start_date: string
  end_date: string
  amount: string
  telegram_link: string
}) {
  return emailWrapper(`
    <!-- Success Banner -->
    <div style="background-color:#337418;border-radius:8px;padding:14px;text-align:center;margin-bottom:24px;">
      <span style="color:#5DD62C;font-size:16px;font-weight:700;">✅ Payment Successful!</span>
    </div>

    <h1 style="color:#F8F8F8;font-size:22px;margin:0 0 16px;">Hi ${data.first_name},</h1>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Welcome to <strong>The Capital Guru!</strong> Your <strong style="color:#5DD62C;">${data.plan_name}</strong> is now active.
    </p>

    <!-- Subscription Details -->
    <div style="background-color:#0F0F0F;border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="color:#888888;font-size:13px;margin:0 0 12px;font-weight:700;">📋 SUBSCRIPTION DETAILS</p>
      <table width="100%" cellpadding="4" cellspacing="0">
        <tr><td style="color:#888888;font-size:14px;">Plan</td><td style="color:#F8F8F8;font-size:14px;text-align:right;font-weight:600;">${data.plan_name}</td></tr>
        <tr><td style="color:#888888;font-size:14px;">Valid From</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">${data.start_date}</td></tr>
        <tr><td style="color:#888888;font-size:14px;">Valid Until</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">${data.end_date}</td></tr>
        <tr><td style="color:#888888;font-size:14px;">Amount Paid</td><td style="color:#5DD62C;font-size:14px;text-align:right;font-weight:700;">₹${data.amount}</td></tr>
      </table>
    </div>

    ${ctaButton('Join Telegram Group Now →', data.telegram_link)}

    <p style="color:#888888;font-size:12px;text-align:center;margin:0 0 24px;">
      ⚠️ This is a one-time invite link. Do not share with others.
    </p>

    <div style="background-color:#0F0F0F;border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="color:#F8F8F8;font-size:14px;margin:0 0 12px;font-weight:600;">Inside the group:</p>
      <p style="color:#F8F8F8;font-size:14px;line-height:2;margin:0;">
        ✅ Real-time buy/sell signals<br>
        ✅ Entry, target & stop-loss for every call<br>
        ✅ Intraday & positional picks<br>
        ✅ Expert market commentary
      </p>
    </div>

    <p style="color:#888888;font-size:13px;margin:0;">
      Need support? Reply to this email or contact
      <a href="https://t.me/thecapitalguru_support" style="color:#5DD62C;text-decoration:none;">@thecapitalguru_support</a>
    </p>
    <p style="color:#F8F8F8;font-size:14px;margin:16px 0 0;">Happy Trading! 📈<br><strong>— The Capital Guru Team</strong></p>
  `)
}

export function getExpiryReminderHtml(data: {
  first_name: string
  plan_name: string
  end_date: string
  days_remaining: 7 | 1
}) {
  const isUrgent = data.days_remaining === 1
  const bannerBg = isUrgent ? '#7f1d1d' : '#7a4f00'
  const bannerText = isUrgent ? '#fca5a5' : '#f59e0b'
  const bannerMessage = isUrgent
    ? '🚨 FINAL REMINDER — Expires Tomorrow!'
    : '⏰ Subscription Expiring Soon'

  return emailWrapper(`
    <div style="background-color:${bannerBg};border-radius:8px;padding:14px;text-align:center;margin-bottom:24px;">
      <span style="color:${bannerText};font-size:16px;font-weight:700;">${bannerMessage}</span>
    </div>

    <h1 style="color:#F8F8F8;font-size:22px;margin:0 0 16px;">Hi ${data.first_name},</h1>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Your <strong style="color:#5DD62C;">${data.plan_name}</strong> expires on <strong>${data.end_date}</strong>.
    </p>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 24px;">
      ${isUrgent
        ? 'After expiry, your Telegram access will be <strong>revoked automatically</strong>. Renew now to keep access.'
        : 'Renew before expiry to avoid losing your Telegram group access and trading signals.'}
    </p>

    ${ctaButton(isUrgent ? 'Renew Now — Don\'t Lose Access →' : 'Renew My Subscription →', 'https://thecapitalguru.net/pricing')}

    <div style="background-color:#0F0F0F;border-radius:8px;padding:20px;margin-top:24px;">
      <p style="color:#888888;font-size:13px;margin:0 0 12px;font-weight:700;">📊 AVAILABLE PLANS</p>
      <table width="100%" cellpadding="6" cellspacing="0">
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Starter</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹2,499/mo</td></tr>
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Pro</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹11,999/6mo</td></tr>
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Elite</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹19,999/yr</td></tr>
      </table>
    </div>
  `)
}

export function getExpiredEmailHtml(data: {
  first_name: string
  plan_name: string
  end_date: string
}) {
  return emailWrapper(`
    <div style="background-color:#202020;border:1px solid #3a3a3a;border-radius:8px;padding:14px;text-align:center;margin-bottom:24px;">
      <span style="color:rgba(248,248,248,0.7);font-size:16px;font-weight:700;">Subscription Ended</span>
    </div>

    <h1 style="color:#F8F8F8;font-size:22px;margin:0 0 16px;">Hi ${data.first_name},</h1>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Your <strong style="color:#5DD62C;">${data.plan_name}</strong> ended on <strong>${data.end_date}</strong>.
    </p>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 8px;">
      You've been removed from the Telegram group.
    </p>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Rejoin anytime — your trading journey isn't over! 💪
    </p>

    ${ctaButton('Renew Subscription →', 'https://thecapitalguru.net/pricing')}

    <div style="background-color:#0F0F0F;border-radius:8px;padding:20px;margin-top:24px;">
      <p style="color:#888888;font-size:13px;margin:0 0 12px;font-weight:700;">📊 CURRENT PLANS</p>
      <table width="100%" cellpadding="6" cellspacing="0">
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Starter</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹2,499/mo</td></tr>
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Pro</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹11,999/6mo</td></tr>
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Elite</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹19,999/yr</td></tr>
      </table>
    </div>
  `)
}

export function getPasswordResetHtml(data: {
  first_name: string
  reset_link: string
}) {
  return emailWrapper(`
    <h1 style="color:#F8F8F8;font-size:22px;margin:0 0 16px;">Hi ${data.first_name},</h1>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 24px;">
      We received a request to reset your password for your Capital Guru account.
    </p>

    ${ctaButton('Reset Password →', data.reset_link)}

    <p style="color:#888888;font-size:13px;margin:24px 0 0;">
      This link expires in 1 hour.<br>
      If you didn't request this, ignore this email — your account is safe.
    </p>
  `)
}

export function getRegistrationWelcomeHtml(data: {
  first_name: string
}) {
  return emailWrapper(`
    <h1 style="color:#F8F8F8;font-size:22px;margin:0 0 16px;">Welcome, ${data.first_name}! 👋</h1>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Thank you for joining <strong>The Capital Guru</strong> — India's most precise stock market signal platform.
    </p>
    <p style="color:#F8F8F8;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Complete your subscription to start receiving real-time trading signals directly in our exclusive Telegram group.
    </p>

    ${ctaButton('View Plans →', 'https://thecapitalguru.net/pricing')}

    <div style="background-color:#0F0F0F;border-radius:8px;padding:20px;margin-top:24px;">
      <p style="color:#888888;font-size:13px;margin:0 0 12px;font-weight:700;">📊 CHOOSE YOUR PLAN</p>
      <table width="100%" cellpadding="6" cellspacing="0">
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Starter</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹2,499/mo</td></tr>
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Pro</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹11,999/6mo</td></tr>
        <tr><td style="color:#5DD62C;font-size:14px;font-weight:600;">Elite</td><td style="color:#F8F8F8;font-size:14px;text-align:right;">₹19,999/yr</td></tr>
      </table>
    </div>
  `)
}
