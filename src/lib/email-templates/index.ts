/**
 * The Capital Guru - Premium Dark Email System
 * All templates utilize the #0B0F0C background and #5DD62C accent.
 * Designed for 600px width and mobile responsiveness.
 */

const getBaseStyles = () => `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    body { margin: 0; padding: 0; background-color: #0B0F0C; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #E5E7EB; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0B0F0C; padding: 40px 20px; }
    .card { background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 32px; margin-bottom: 24px; }
    .header { margin-bottom: 32px; text-align: center; }
    .logo { font-size: 24px; font-weight: 700; color: #5DD62C; letter-spacing: -1px; }
    h1 { font-size: 28px; font-weight: 600; color: #F8F8F8; margin-top: 0; margin-bottom: 16px; line-height: 1.2; }
    p { font-size: 16px; line-height: 1.6; color: #9CA3AF; margin-bottom: 20px; }
    .btn { display: inline-block; background-color: #5DD62C; color: #0B0F0C !important; font-weight: 600; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-size: 16px; transition: all 0.3s ease; }
    .footer { text-align: center; font-size: 13px; color: #4B5563; margin-top: 40px; }
    .stats-row { border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 20px; margin-top: 20px; display: table; width: 100%; }
    .stat-item { display: table-cell; width: 33%; text-align: center; }
    .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6B7280; margin-bottom: 4px; }
    .stat-value { font-size: 18px; font-weight: 600; color: #5DD62C; }
    .badge { background: rgba(93, 214, 44, 0.1); border: 1px solid rgba(93, 214, 44, 0.2); color: #5DD62C; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 700; }
  </style>
`

/* ── 1. WELCOME TEMPLATE ── */
export const welcomeTemplate = (name: string) => `
  <!DOCTYPE html>
  <html>
    <head>${getBaseStyles()}</head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">THE CAPITAL GURU</div>
        </div>
        <div class="card">
          <h1>Welcome to the Inner Circle, ${name} 🚀</h1>
          <p>You've just taken the first step toward mechanical trading precision. No more emotional guesswork—just high-signal market alpha delivered directly to your fingertips.</p>
          <p>Join our private Telegram community now to start receiving real-time signals and connect with 2,400+ serious traders.</p>
          <div style="text-align: center; margin-top: 32px;">
            <a href="https://t.me/thecapitalguru" class="btn">Join Elite Telegram</a>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} The Capital Guru. All signals are for educational purposes.
        </div>
      </div>
    </body>
  </html>
`

/* ── 2. PAYMENT TEMPLATE ── */
export const paymentTemplate = (data: { name: string; amount: string; plan: string; date: string }) => `
  <!DOCTYPE html>
  <html>
    <head>${getBaseStyles()}</head>
    <body>
      <div class="container">
        <div class="header"><div class="logo">THE CAPITAL GURU</div></div>
        <div class="card">
          <div style="margin-bottom: 24px;"><span class="badge">PAYMENT CONFIRMED ✅</span></div>
          <h1>Access Activated: ${data.plan}</h1>
          <p>Hello ${data.name}, your payment of ₹${data.amount} was successful. Your elite access has been provisioned and is active as of ${data.date}.</p>
          
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-label">Plan</div>
              <div class="stat-value">${data.plan}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Amount</div>
              <div class="stat-value">₹${data.amount}</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 32px;">
            <a href="https://thecapitalguru.net/dashboard" class="btn">Access Terminal</a>
          </div>
        </div>
        <div class="footer">Razorpay Secure Transaction ID: TXN_${Math.random().toString(36).slice(2, 9).toUpperCase()}</div>
      </div>
    </body>
  </html>
`

/* ── 3. SIGNAL TEMPLATE ── */
export const signalTemplate = (data: { stock: string; entry: string; sl: string; target: string }) => `
  <!DOCTYPE html>
  <html>
    <head>${getBaseStyles()}</head>
    <body>
      <div class="container">
        <div class="header"><div class="logo">THE CAPITAL GURU</div></div>
        <div class="card" style="border-left: 4px solid #5DD62C;">
          <div style="margin-bottom: 16px;"><span class="badge">NEW SIGNAL ALERT 📈</span></div>
          <h1 style="margin-bottom: 8px;">BUY: ${data.stock}</h1>
          <p style="margin-bottom: 24px;">Our option chain analysis indicates a massive momentum shift. Execute now within the entry zone.</p>
          
          <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 24px;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span style="color: #9CA3AF;">Entry Zone</span>
              <span style="color: #F8F8F8; font-weight: 600;">₹${data.entry}</span>
            </div>
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between;">
              <span style="color: #9CA3AF;">Target</span>
              <span style="color: #5DD62C; font-weight: 600;">₹${data.target}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #9CA3AF;">Stop Loss</span>
              <span style="color: #EF4444; font-weight: 600;">₹${data.sl}</span>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 32px;">
            <a href="https://t.me/thecapitalguru" class="btn">View on Telegram</a>
          </div>
        </div>
      </div>
    </body>
  </html>
`

/* ── 4. REMINDER TEMPLATE ── */
export const reminderTemplate = (name: string, days: number) => `
  <!DOCTYPE html>
  <html>
    <head>${getBaseStyles()}</head>
    <body>
      <div class="container">
        <div class="header"><div class="logo">THE CAPITAL GURU</div></div>
        <div class="card" style="border-top: 4px solid #FACC15;">
          <h1>Access Expiring in ${days} Days 🚨</h1>
          <p>Hello ${name}, your Guru Elite access is scheduled to expire soon. Don't lose your market edge—renew now to maintain uninterrupted access to real-time Telegram signals.</p>
          <p>A single profitable trade pays for the entire year. Keep the momentum going.</p>
          <div style="text-align: center; margin-top: 32px;">
            <a href="https://thecapitalguru.net/pricing" class="btn">Renew Subscription</a>
          </div>
        </div>
      </div>
    </body>
  </html>
`
