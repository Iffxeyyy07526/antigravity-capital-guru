/**
 * The Capital Guru - Institutional Branded Communication System
 * Background: #0B0B0B | Accent: #5DD62C | Secondary: Gold
 * Optimized for high conversion and premium feel.
 */

const getBaseStyles = () => `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; background-color: #0B0B0B; font-family: 'Inter', sans-serif; }
    .main { background-color: #161616; margin: 0 auto; width: 600px; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.05); overflow: hidden; }
    .hero { background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1611974717414-78330caec704?auto=format&fit=crop&q=80&w=800') center/cover; padding: 60px 40px; text-align: center; }
    .logo { color: #5DD62C; font-weight: 700; font-size: 20px; letter-spacing: -0.5px; margin-bottom: 40px; }
    .button { background-color: #5DD62C; color: #000; font-weight: 700; padding: 18px 45px; border-radius: 12px; text-decoration: none; display: inline-block; }
    .content { padding: 40px 50px; text-align: center; color: #999; line-height: 1.6; }
    .social-section { background-color: #1A1A1A; padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
    .footer { padding: 40px; text-align: center; font-size: 12px; color: #555; }
  </style>
`

const getSocialSection = () => `
  <tr>
    <td class="social-section">
      <div style="color: #FFF; font-size: 14px; margin-bottom: 15px;">Follow us for insights & updates</div>
      <a href="https://www.instagram.com/thecapitalguru.in" style="color: #5DD62C; font-weight: 600; text-decoration: none;">👉 Follow on Instagram</a>
    </td>
  </tr>
`

/* ── 1. AUTH EMAIL ── */
export const authVerifyTemplate = (name: string, link: string) => `
  <!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0">
        <tr><td class="hero"><div class="logo">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFF; margin: 0;">Secure Your Account</h1></td></tr>
        <tr><td class="content">
          <p>Welcome to the elite circle, ${name}. To maintain the highest level of security and ensure you receive our premium NSE signals, please verify your email address.</p>
          <div style="margin: 40px 0;"><a href="${link}" class="button">Verify Email Address</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer">&copy; 2024 The Capital Guru. All rights reserved.</td></tr>
      </table>
    </td></tr></table>
  </body></html>
`

/* ── 2. PAYMENT CONFIRMATION ── */
export const paymentTemplate = (data: { name: string; amount: string; plan: string; link: string }) => `
  <!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0">
        <tr><td class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800');">
          <div class="logo">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFF; margin: 0;">Payment Confirmed</h1>
        </td></tr>
        <tr><td class="content">
          <p>Success, ${data.name}. Your active access to ${data.plan} is now provisioned. Get ready to execute institutional-grade signals.</p>
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 25px; margin-top: 30px; text-align: left;">
            <div style="color: #5DD62C; font-weight: 700; font-size: 14px; margin-bottom: 10px;">INSTRUCTIONS</div>
            <p style="margin: 0; font-size: 14px;">1. Click join below.<br>2. Approved within minutes.<br>3. Enable notifications.</p>
          </div>
          <div style="margin: 40px 0;"><a href="${data.link}" class="button">Join Telegram Group</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer">Verification ID: ${Math.random().toString(36).slice(2, 10).toUpperCase()}</td></tr>
      </table>
    </td></tr></table>
  </body></html>
`

/* ── 3. WELCOME EMAIL ── */
export const welcomeTemplate = (name: string, link: string) => `
  <!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0">
        <tr><td class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1642543448553-902264560b0e?auto=format&fit=crop&q=80&w=800');">
          <div class="logo">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFF; margin: 0;">Phase One Complete</h1>
        </td></tr>
        <tr><td class="content">
          <p>Hello ${name}, you've officially joined the registry. We provide mechanical signals backed by rigorous analytic models derived from institutional option chain data.</p>
          <div style="margin: 40px 0;"><a href="${link}" class="button">View Access Plans</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer">Institutional Signals. Minimalist Execution.</td></tr>
      </table>
    </td></tr></table>
  </body></html>
`

/* ── 4. EXPIRY WARNING ── */
export const reminderTemplate = (name: string, days: number, link: string) => `
  <!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0">
        <tr><td class="hero" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=800');">
          <div class="logo">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFF; margin: 0;">Maintain Your Edge</h1>
          <p style="color: #FACC15; font-weight: 600; margin-top: 10px;">Expiring in ${days} days</p>
        </td></tr>
        <tr><td class="content">
          <p>Hello ${name}, your current access is coming to an end. Renew now to maintain uninterrupted access to real-time signals and community insights.</p>
          <div style="margin: 40px 0;"><a href="${link}" class="button">Renew Subscription Now</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer">&copy; 2024 The Capital Guru.</td></tr>
      </table>
    </td></tr></table>
  </body></html>
`

