'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Users, 
  ChevronRight,
  ArrowUpRight,
  Target,
  Mail,
  Camera,
  CheckCircle2
} from 'lucide-react'
import Navbar from '@/components/Navbar'

/* ─── DATA ─── */
const features = [
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Never Miss a Trade', desc: 'Instant Telegram alerts with exact entry, stop-loss, and target levels.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Trade Without Hesitation', desc: 'Crystal clear signals remove emotional guesswork from your execution.' },
  { icon: <Target className="w-6 h-6" />, title: 'Consistent Market Edge', desc: 'Battle-tested strategies for both intraday momentum and positional swings.' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Protect Your Capital', desc: 'Strict risk-reward ratios and mechanical stop-losses on every single alert.' },
  { icon: <BarChart3 className="w-6 h-6" />, title: 'Master Options Data', desc: 'Deep option chain analysis decoded into simple buy/sell triggers.' },
  { icon: <Users className="w-6 h-6" />, title: 'Grow With Elites', desc: 'Join 2,400+ serious traders sharing real-time market alpha.' },
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
    isPopular: false,
    features: ['Daily market signals', 'Telegram group access', 'Email support'],
  },
  {
    name: 'Pro',
    price: '11,999',
    period: '/6mo',
    originalPrice: '14,994',
    isPopular: true,
    features: ['Daily market signals', 'Telegram group access', 'Priority support', 'Intraday alerts', 'Option chain analysis'],
  },
  {
    name: 'Elite',
    price: '19,999',
    period: '/yr',
    originalPrice: '29,988',
    isPopular: false,
    features: ['Daily market signals', 'VIP 24/7 support', 'Option chain analysis', 'Portfolio review', 'Consultation'],
  },
]

export default function HomePage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-primary/30">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Elite background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute -top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Now: NSE Momentum Triggers</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-[1] tracking-tighter mb-8">
              Trade with <br/>
              <span className="text-primary text-glow-green italic">Institutional</span> <br/>
              Precision.
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-medium">
              Join 2,400+ serious traders using the Indian market&apos;s most precise signal engine. 
              Real-time entry, targets, and risk parameters delivered instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <Link href="/register">
                <button className="btn-primary py-4 px-10 text-lg group">
                  Start Trading
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="btn-ghost py-4 px-10 text-lg border-zinc-800 hover:border-zinc-700">
                  View Access Plans
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-8 py-6 border-t border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-800" />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">Join 2,400+ Elite Members</p>
                <p className="text-zinc-500">₹4.2Cr+ total member profits</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="pro-glow p-[2px] rounded-[32px]">
              <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-primary text-black font-black text-[10px] uppercase rounded">Live Signal</div>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">NSE: BANKNIFTY</span>
                  </div>
                  <TrendingUp className="text-primary w-5 h-5" />
                </div>

                <div className="mb-8">
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Current Setup</p>
                  <h3 className="text-4xl font-black text-white mb-2">Long Position</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary text-2xl font-black">₹44,520</span>
                    <span className="text-zinc-600 text-sm font-bold uppercase">Optimal Entry</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center transition-colors hover:border-primary/30">
                    <span className="text-zinc-400 font-bold text-sm uppercase">Target 1</span>
                    <span className="text-primary text-xl font-black">₹44,800</span>
                  </div>
                  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center transition-colors hover:border-red-500/30">
                    <span className="text-zinc-400 font-bold text-sm uppercase">Stop Loss</span>
                    <span className="text-red-500 text-xl font-black">₹44,350</span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  />
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-black uppercase text-zinc-600 tracking-tighter">
                  <span>Entry Range Connected</span>
                  <span className="text-primary">In Profit +12%</span>
                </div>
              </div>
            </div>

            {/* Float Elements */}
            <div className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <ArrowUpRight className="text-primary w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-sm tracking-tight">Active ROI</p>
                  <p className="text-zinc-500 text-xs font-bold leading-none">REAL-TIME DATA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-24 border-y border-white/5 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</h4>
              <p className="text-primary font-bold uppercase text-xs tracking-widest mb-1">{stat.label}</p>
              <p className="text-zinc-600 text-[10px] font-bold uppercase mb-1">{stat.context}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Trade with Total <span className="text-primary italic">Clarity.</span></h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">We strip away the noise. You get pure, institutional-grade directives designed for one thing: Execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 transition-all hover:bg-zinc-900/40 hover:border-primary/20 group"
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-black">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section id="pricing" className="py-40 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Secure Your <span className="text-primary italic">Edge.</span></h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">One profitable trade can fund your entire year. Choose your precision level.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-10 rounded-[32px] transition-all duration-300 ${
                  plan.isPopular 
                    ? 'bg-zinc-900/40 border-2 border-primary shadow-[0_0_50px_rgba(34,197,94,0.15)] md:scale-[1.05] z-10 pro-glow' 
                    : 'bg-zinc-900/10 border border-white/10'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-black text-[10px] px-5 py-1.5 rounded-full uppercase tracking-widest shadow-2xl">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-zinc-500 text-xl font-bold">₹</span>
                  <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-zinc-600 font-bold ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 group">
                      <CheckCircle2 className={`w-4 h-4 ${plan.isPopular ? 'text-primary' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                      <span className="text-zinc-400 text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <button className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all ${plan.isPopular ? 'btn-primary' : 'btn-ghost'}`}>
                    Select {plan.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-40 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 rounded-[48px] bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to Trade like an <span className="text-primary italic">Institutional Desk?</span></h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto font-medium">Stop guessing. Sign up today and receive your first institutional-grade NSE signal instantly.</p>
            <Link href="/register">
              <button className="btn-primary py-5 px-12 text-xl font-black shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                Access Signals Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER MINI ── */}
      <footer className="py-20 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-black text-white tracking-tighter">CAPITAL GURU</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-8">
              The Indian market&apos;s most precise options & equity signal engine. 
              Institutional quality datasets decoded into simple executable triggers.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Follow us on Instagram" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors">
                <Camera className="w-5 h-5 text-zinc-400" />
              </a>
              <a href="#" aria-label="Contact support via Email" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors">
                <Mail className="w-5 h-5 text-zinc-400" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold uppercase text-xs tracking-widest mb-8">Product</h5>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="#features" className="hover:text-primary transition-colors">Signals</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Risk Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase text-xs tracking-widest mb-8">Support</h5>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><a href="mailto:support@thecapitalguru.net" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} The Capital Guru. Institutional Precision.
          </p>
        </div>
      </footer>
    </div>
  )
}
