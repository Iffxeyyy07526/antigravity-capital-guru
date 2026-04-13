import juice from 'juice';

/**
 * The Capital Guru - Institutional Branded Communication System
 * Hardened for security (XSS/URL Validation) and compatibility.
 */

/* ── HELPERS ── */

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const getCurrentYear = () => new Date().getFullYear();

const validateUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '#';
    const isValidDomain = parsed.hostname === 'thecapitalguru.net' || parsed.hostname.endsWith('.thecapitalguru.net');
    if (!isValidDomain) return '#';
    return parsed.toString();
  } catch {
    return '#';
  }
};

const getBaseStyles = () => `
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      min-width: 100%; 
      width: 100% !important; 
      background-color: #0B0B0B; 
      font-family: 'Inter', -apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif; 
    }
    .main { 
      background-color: #161616; 
      margin: 0 auto; 
      width: 600px; 
      border-radius: 24px; 
      border: 1px solid #222222; /* Fallback for rgba(255, 255, 255, 0.05) */
      overflow: hidden; 
    }
    .hero { 
      background-color: #0F172A; 
      padding: 60px 40px; 
      text-align: center; 
    }
    .logo { 
      color: #5DD62C; 
      font-weight: 700; 
      font-size: 20px; 
      letter-spacing: -0.5px; 
      margin-bottom: 40px; 
    }
    .button { 
      background-color: #5DD62C; 
      color: #000000 !important; 
      font-weight: 700; 
      padding: 18px 45px; 
      border-radius: 12px; 
      text-decoration: none; 
      display: inline-block; 
    }
    .content { 
      padding: 40px 50px; 
      text-align: center; 
      color: #D1D1D1; 
      line-height: 1.6; 
    }
    .social-section { 
      background-color: #1A1A1A; 
      padding: 30px; 
      text-align: center; 
      border-top: 1px solid #222222; /* Fallback for rgba(255,255,255,0.05) */
    }
    .footer { 
      padding: 40px; 
      text-align: center; 
      font-size: 12px; 
      color: #666666; 
    }
  </style>
`;

const getSocialSection = () => `
  <tr>
    <td class="social-section" style="background-color: #1A1A1A; padding: 30px; text-align: center; border-top: 1px solid #222222;">
      <div style="color: #FFFFFF; font-size: 14px; margin-bottom: 15px; font-weight: 600;">Follow us for insights & updates</div>
      <a href="https://www.instagram.com/thecapitalguru.in" style="color: #5DD62C; font-weight: 600; text-decoration: none; font-size: 14px;">Follow on Instagram</a>
    </td>
  </tr>
`;

/**
 * Automates CSS inlining for email client compatibility
 */
const finalizeTemplate = (html: string) => {
  return juice(html, {
    applyAttributesTableElements: true,
    applyStyleTags: true,
    removeStyleTags: true
  });
};

/* ── 1. AUTH EMAIL ── */
export const authVerifyTemplate = (name: string, link: string) => {
  const safeName = escapeHtml(name);
  const safeLink = validateUrl(link);

  const html = `<!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #161616; border-radius: 24px; border: 1px solid #222222;">
        <tr><td class="hero" style="background-color: #0F172A; padding: 60px 40px; text-align: center;">
          <div class="logo" style="color: #5DD62C; font-weight: 700; font-size: 20px;">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFFFFF; margin: 0;">Secure Your Account</h1></td></tr>
        <tr><td class="content" style="padding: 40px 50px; text-align: center; color: #D1D1D1;">
          <p>Welcome to the elite circle, ${safeName}. To maintain the highest level of security, please verify your email address.</p>
          <div style="margin: 40px 0;"><a href="${safeLink}" class="button" style="background-color: #5DD62C; color: #000000 !important; font-weight: 700; padding: 18px 45px; border-radius: 12px; text-decoration: none;">Verify Email Address</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer" style="padding: 40px; text-align: center; font-size: 12px; color: #666666;">&copy; ${getCurrentYear()} The Capital Guru. All rights reserved.</td></tr>
      </table>
    </td></tr></table>
  </body></html>`;

  return finalizeTemplate(html);
}

/* ── 2. PAYMENT CONFIRMATION ── */
export const paymentTemplate = (data: { name: string; amount: string; plan: string; link: string; orderId?: string }) => {
  const safeName = escapeHtml(data.name);
  const safeLink = validateUrl(data.link);
  const safeAmount = escapeHtml(data.amount);
  const safePlan = escapeHtml(data.plan || '');
  const safeOrderId = data.orderId ? escapeHtml(data.orderId) : 'N/A';

  const html = `<!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #161616; border-radius: 24px; border: 1px solid #222222;">
        <tr><td class="hero" style="background-color: #0F172A; padding: 60px 40px; text-align: center;">
          <div class="logo" style="color: #5DD62C; font-weight: 700; font-size: 20px;">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFFFFF; margin: 0;">Payment Confirmed</h1>
        </td></tr>
        <tr><td class="content" style="padding: 40px 50px; text-align: center; color: #D1D1D1;">
          <p>Success, ${safeName}. Your active access to <strong>${safePlan}</strong> is now provisioned.</p>
          <div style="background-color: #1a1e1b; border: 1px solid #222222; border-radius: 12px; padding: 25px; margin-top: 30px; text-align: left;">
            <div style="color: #5DD62C; font-weight: 700; font-size: 14px; margin-bottom: 10px;">ORDER DETAILS</div>
            <p style="margin: 0; font-size: 14px; color: #999999;">Amount Paid: <strong>₹${safeAmount}</strong><br>Plan: ${safePlan}<br>Order Status: Active</p>
          </div>
          <div style="margin: 40px 0;"><a href="${safeLink}" class="button" style="background-color: #5DD62C; color: #000000 !important; font-weight: 700; padding: 18px 45px; border-radius: 12px; text-decoration: none;">Join Telegram Group</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer" style="padding: 40px; text-align: center; font-size: 12px; color: #666666;">Verification ID: ${safeOrderId}</td></tr>
      </table>
    </td></tr></table>
  </body></html>`;

  return finalizeTemplate(html);
}

/* ── 3. WELCOME EMAIL ── */
export const welcomeTemplate = (name: string, link: string) => {
  const safeName = escapeHtml(name);
  const safeLink = validateUrl(link);

  const html = `<!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #161616; border-radius: 24px; border: 1px solid #222222;">
        <tr><td class="hero" style="background-color: #0F172A; padding: 60px 40px; text-align: center;">
          <div class="logo" style="color: #5DD62C; font-weight: 700; font-size: 20px;">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFFFFF; margin: 0;">Phase One Complete</h1>
        </td></tr>
        <tr><td class="content" style="padding: 40px 50px; text-align: center; color: #D1D1D1;">
          <p>Hello ${safeName}, you've officially joined the registry. We provide mechanical signals backed by rigorous analytic models.</p>
          <div style="margin: 40px 0;"><a href="${safeLink}" class="button" style="background-color: #5DD62C; color: #000000 !important; font-weight: 700; padding: 18px 45px; border-radius: 12px; text-decoration: none;">View Access Plans</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer" style="padding: 40px; text-align: center; font-size: 12px; color: #666666;">&copy; ${getCurrentYear()} The Capital Guru. Institutional Precision.</td></tr>
      </table>
    </td></tr></table>
  </body></html>`;

  return finalizeTemplate(html);
}

/* ── 4. EXPIRY WARNING ── */
export const reminderTemplate = (name: string, days: number, link: string) => {
  const safeName = escapeHtml(name);
  const safeLink = validateUrl(link);

  const html = `<!DOCTYPE html><html><head>${getBaseStyles()}</head><body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0B0B0B"><tr><td align="center" style="padding: 20px 0;">
      <table class="main" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #161616; border-radius: 24px; border: 1px solid #222222;">
        <tr><td class="hero" style="background-color: #0F172A; padding: 60px 40px; text-align: center;">
          <div class="logo" style="color: #5DD62C; font-weight: 700; font-size: 20px;">THE CAPITAL GURU</div><h1 style="font-size: 32px; color: #FFFFFF; margin: 0;">Maintain Your Edge</h1>
          <p style="color: #FACC15; font-weight: 600; margin-top: 10px;">Expiring in ${days} days</p>
        </td></tr>
        <tr><td class="content" style="padding: 40px 50px; text-align: center; color: #D1D1D1;">
          <p>Hello ${safeName}, your current access is coming to an end. Renew now to maintain uninterrupted access to real-time signals.</p>
          <div style="margin: 40px 0;"><a href="${safeLink}" class="button" style="background-color: #5DD62C; color: #000000 !important; font-weight: 700; padding: 18px 45px; border-radius: 12px; text-decoration: none;">Renew Subscription Now</a></div>
        </td></tr>
        ${getSocialSection()}
        <tr><td class="footer" style="padding: 40px; text-align: center; font-size: 12px; color: #666666;">&copy; ${getCurrentYear()} The Capital Guru.</td></tr>
      </table>
    </td></tr></table>
  </body></html>`;

  return finalizeTemplate(html);
}


