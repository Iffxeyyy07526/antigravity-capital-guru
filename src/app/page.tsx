import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ─── Feature Data (Outcome Focused) ─── */
const features = [
  { icon: '📡', title: 'Never Miss a Trade', desc: 'Instant Telegram alerts with exact entry, stop-loss, and target levels.' },
  { icon: '⚡', title: 'Trade Without Hesitation', desc: 'Crystal clear signals remove emotional guesswork from your execution.' },
  { icon: '📈', title: 'Consistent Market Edge', desc: 'Battle-tested strategies for both intraday momentum and positional swings.' },
  { icon: '🛡️', title: 'Protect Your Capital', desc: 'Strict risk-reward ratios and mechanical stop-losses on every single alert.' },
  { icon: '📊', title: 'Master Options Data', desc: 'Deep option chain analysis decoded into simple buy/sell triggers.' },
  { icon: '🤝', title: 'Grow With Elites', desc: 'Join 2,400+ serious traders sharing real-time market alpha and support.' },
]

const stats = [
  { value: '87.3%', label: 'Win Rate', context: 'Verified over 12 months' },
  { value: '₹4.2Cr+', label: 'Profits Generated', context: 'Collective member gains' },
  { value: '2,400+', label: 'Active Members', context: 'Growing daily' },
  { value: '1,200+', label: 'Signals Delivered', context: 'High precision accuracy' },
]

const plans = [
  {
    name: 'Starter',
    price: '2,499',
    period: '/mo',
    originalPrice: null,
    badge: null,
    isPopular: false,
    features: ['Daily market signals', 'Telegram group access', 'Email support'],
  },
  {
    name: 'Pro',
    price: '11,999',
    period: '/6mo',
    originalPrice: '14,994',
    badge: 'MOST POPULAR',
    isPopular: true,
    features: ['Daily market signals', 'Telegram group access', 'Priority support', 'Intraday alerts', 'Option chain analysis'],
  },
  {
    name: 'Elite',
    price: '19,999',
    period: '/yr',
    originalPrice: '29,988',
    badge: 'BEST VALUE',
    isPopular: false,
    features: ['Daily market signals', 'Telegram group access', '24/7 VIP support', 'Intraday alerts', 'Option chain analysis', 'Monthly 1-on-1 consultation', 'Portfolio review'],
  },
]


export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden fade-up">
        {/* Extreme minimal glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left content */}
          <div className="max-w-2xl">
            <h1 className="font-display font-medium text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.01em] text-on-surface mb-6">
              Real-Time NSE Signals That <span className="text-primary font-semibold">Actually Work</span>
            </h1>

            <p className="text-on-surface-muted text-[18px] font-body leading-relaxed mb-10 max-w-xl">
              87.3% win rate. Entry, SL & Target delivered instantly to Telegram. Stop guessing and start executing with institutional precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/register" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                Start Receiving Signals
              </Link>
              <Link href="#pricing" className="btn-ghost text-base px-10 py-4 w-full sm:w-auto hover:bg-[#5DD62C]/5 transition-colors">
                See Plans
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-col gap-1.5 text-on-surface-muted text-[14px] font-body">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2"><span className="text-secondary">✓</span> 2,400+ traders</span>
                <span className="flex items-center gap-2"><span className="text-secondary">✓</span> ₹4.2Cr+ profits generated</span>
              </div>
              <span className="text-[13px] opacity-70 italic">(last 3 months, 1,200+ trades verified)</span>
            </div>
          </div>

          {/* Right: Glassmorphic signal card hero */}
          <div className="relative hidden lg:flex justify-end items-center perspective-1000">
            <div className="relative w-full max-w-md bg-surface/80 glass-card p-8 shadow-glow-xl border-outline-variant hover:border-primary/30 transition-colors duration-500">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    ACTIVE BUY
                  </div>
                  <span className="text-on-surface-muted text-xs">NSE: RELIANCE</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-on-surface font-display font-semibold text-3xl tracking-tight mb-1">Reliance Ind.</h3>
                <p className="text-primary font-body text-xl font-medium">₹2,450.00 <span className="text-sm text-on-surface-muted">Entry</span></p>
              </div>

              {/* Animated chart line sequence */}
              <div className="h-24 w-full mb-6 relative">
                <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5DD62C" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#5DD62C" stopOpacity="0" />
                  </linearGradient>
                  
                  {/* Subtle grid */}
                  <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Chart shadow */}
                  <polygon
                    points="0,60 10,50 30,55 50,45 80,48 110,30 140,35 170,10 200,15 200,60"
                    fill="url(#glow)"
                  />
                  {/* Active Line */}
                  <polyline
                    points="0,60 10,50 30,55 50,45 80,48 110,30 140,35 170,10 200,15"
                    fill="none"
                    stroke="#5DD62C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative animate-[dash_10s_linear_infinite]"
                  />
                  
                  {/* Target Point */}
                  <circle cx="200" cy="15" r="4" fill="#0B0F0C" stroke="#5DD62C" strokeWidth="2" className="animate-pulse" />
                </svg>
              </div>

              <div className="flex justify-between items-center bg-black/40 rounded-xl p-4 border border-white/5">
                <div>
                  <p className="text-[11px] text-on-surface-muted font-label uppercase tracking-widest mb-1">Target</p>
                  <p className="text-on-surface font-display font-medium text-lg">₹2,520</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="text-[11px] text-on-surface-muted font-label uppercase tracking-widest mb-1">Stop Loss</p>
                  <p className="text-red-400 font-display font-medium text-lg">₹2,430</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ── */}
      <section className="bg-surface/30 border-y border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left md:text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-primary font-display font-semibold text-[40px] leading-tight mb-2">{stat.value}</p>
                <p className="text-on-surface font-medium text-[16px] mb-1">{stat.label}</p>
                <p className="text-on-surface-muted text-[13px] font-body">{stat.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FEATURES ── */}
      <section className="py-28 md:py-40 fade-up [animation-delay:200ms]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-[-0.01em] text-on-surface mb-8">
              Trade With Complete Clarity
            </h2>
            <p className="text-on-surface-muted text-[19px] leading-[1.6] font-body max-w-2xl mx-auto">
              We remove the noise. You get pure, data-backed execution triggers designed to consistently grow your portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-card glass-card-hover p-10"
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-2xl mb-6">
                  {f.icon}
                </div>
                <h3 className="font-display font-medium text-on-surface text-[20px] tracking-tight mb-3">{f.title}</h3>
                <p className="text-on-surface-muted text-[15px] font-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SIGNAL PREVIEW ── */}
      <section id="preview" className="py-28 md:py-40 bg-surface/50 border-y border-outline-variant overflow-hidden fade-up [animation-delay:300ms]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-card p-10 border-primary/20 shadow-[0_8px_40px_rgba(0,0,0,0.3)] relative max-w-lg mx-auto lg:mx-0">
                <div className="absolute -top-3 left-6 flex gap-2">
                  <span className="bg-primary text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm">New Alert</span>
                  <span className="bg-[#1DA1F2] text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm">Telegram</span>
                </div>
                
                <div className="mt-4">
                  <p className="font-display text-2xl text-on-surface font-semibold mb-1">BUY: RELIANCE</p>
                  <p className="text-on-surface-muted text-sm mb-6">Entry Zone: ₹2445 - ₹2450</p>
                  
                  <div className="space-y-4">
                    <div className="bg-black/40 rounded-lg p-4 border border-outline-variant flex justify-between items-center">
                      <span className="text-on-surface-muted text-sm">Target</span>
                      <span className="text-primary font-display font-medium text-lg">₹2520.00</span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 border border-outline-variant flex justify-between items-center">
                      <span className="text-on-surface-muted text-sm">Stop Loss</span>
                      <span className="text-red-400 font-display font-medium text-lg">₹2430.00</span>
                    </div>
                  </div>

                  {/* Progression Bar */}
                  <div className="mt-8">
                    <div className="flex justify-between text-[11px] font-label text-on-surface-muted uppercase tracking-wider mb-2">
                      <span>Entry</span>
                      <span className="text-primary">Targeting +2.8%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[35%] rounded-full shadow-[0_0_10px_#5DD62C]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight text-on-surface mb-6">
                Execution Without Emotion.
              </h2>
              <p className="text-on-surface-muted text-[18px] font-body leading-relaxed mb-8">
                Receive institutional-grade signals formatted perfectly for instant execution. Every alert includes strict risk management parameters, eliminating greed and fear from your trading lifecycle.
              </p>
              <ul className="space-y-4 font-body text-on-surface-muted">
                <li className="flex items-center gap-3"><span className="text-primary">✓</span> Clear Buy / Sell Directives</li>
                <li className="flex items-center gap-3"><span className="text-primary">✓</span> Calculated Stop Losses</li>
                <li className="flex items-center gap-3"><span className="text-primary">✓</span> Pre-defined Profit Targets</li>
                <li className="flex items-center gap-3"><span className="text-primary">✓</span> Instant Telegram Push Delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PRICING ── */}
      <section id="pricing" className="py-28 md:py-40 fade-up [animation-delay:400ms]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 text-on-surface">
            <h2 className="font-display font-semibold text-5xl sm:text-6xl tracking-[-0.01em] mb-6 text-on-surface">
              Select Your Edge
            </h2>
            <p className="text-on-surface-muted text-[19px] leading-[1.6] font-body">
              A single profitable trade pays for an entire year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-surface/40 rounded-[20px] p-10 lg:p-12 flex flex-col transition-all duration-400 glass-card-hover ${
                  plan.isPopular
                    ? 'border-primary/50 shadow-[0_4px_30px_rgba(93,214,44,0.15)] md:scale-[1.04] z-10 bg-surface/70'
                    : 'border-outline-variant glass-card'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full ${
                    plan.isPopular ? 'bg-primary text-black animate-pulse' : 'bg-surface border border-outline-variant text-primary'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <h3 className="font-display font-medium text-on-surface text-[22px] mb-2 mt-4">{plan.name}</h3>

                <div className="mb-8 flex items-baseline">
                  {plan.originalPrice && (
                    <span className="text-on-surface-muted line-through text-xl mr-3 font-medium">₹{plan.originalPrice}</span>
                  )}
                  <span className="font-display font-semibold text-on-surface text-[48px] tracking-tight">₹{plan.price}</span>
                  <span className="text-on-surface-muted text-sm ml-2 font-medium">{plan.period}</span>
                </div>

                <div className="w-full h-px bg-outline-variant mb-8" />

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-on-surface-muted text-[15px] font-body">
                      <span className="text-primary mt-0.5">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className={`w-full text-center py-4 rounded-xl font-semibold tracking-wide transition-all ${
                  plan.isPopular 
                    ? 'bg-primary text-black hover:bg-[#6AF033] hover:shadow-[0_0_20px_rgba(93,214,44,0.4)]' 
                    : 'bg-surface border border-primary/30 text-primary hover:bg-primary/5'
                }`}>
                  Select {plan.name}
                </Link>
                
                {/* Risk Reversal under button */}
                <p className="text-center text-on-surface-muted text-[11px] mt-4 opacity-70">
                  Secure checkout via Razorpay
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center text-on-surface-muted text-sm font-body">
            ⚠️ <span className="text-primary font-medium">Limited Seats:</span> Due to signal execution volume, we cap new intake periodically.
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CONVERSION FOOTER / GUARANTEE ── */}
      <section className="py-20 bg-primary/5 border-t border-primary/10 rounded-t-[40px] mt-10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-on-surface mb-6">7-Day Satisfaction Guarantee</h2>
          <p className="text-on-surface-muted text-lg mb-10">We stand entirely behind our edge. Follow our risk management rules, and if you aren&apos;t profitable, our support team will review and honor our commitment to your trading journey.</p>
          <Link href="/register" className="btn-primary text-base px-10 py-4 shadow-glow-lg">Build Your Portfolio Today</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
