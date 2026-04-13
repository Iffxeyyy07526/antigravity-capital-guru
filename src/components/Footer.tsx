'use client'

import React from 'react'
import Link from 'next/link'
import { Rocket, Mail, Send, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Signals', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Results', href: '/#results' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#050505] border-t border-white/5 relative pt-24 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <Rocket className="w-5 h-5 text-primary group-hover:text-inherit" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">Capital <span className="text-primary not-italic">Guru</span></span>
            </Link>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed max-w-sm mb-10">
              The Indian market&apos;s most precise options & equity signal station. Institutional data decoded for retail execution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:support@thecapitalguru.net" 
                className="flex items-center gap-2 group text-white/80 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">Direct Desk</span>
              </a>
              <a 
                href="https://t.me/thecapitalguru_support" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 group text-white/80 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">Admin Terminal</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 select-none">Navigation</h4>
              <ul className="space-y-4">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-zinc-400 text-sm font-bold hover:text-primary hover:text-glow-green flex items-center gap-1 group transition-all"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 select-none">Compliance</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-zinc-400 text-sm font-bold hover:text-white transition-all flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 select-none">Station Status</h4>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">All Systems Operational</span>
                 </div>
                 <p className="text-zinc-600 text-[9px] font-bold leading-relaxed uppercase">Real-time data feeds connected via Alpha Station v2.4</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em] select-none">
            &copy; {new Date().getFullYear()} The Capital Guru. Precision In Signal.
          </p>
          <div className="flex items-center gap-8 text-zinc-700">
             <span className="text-[10px] font-black uppercase tracking-widest">NSE Segment</span>
             <span className="text-[10px] font-black uppercase tracking-widest">Options Elite</span>
             <span className="text-[10px] font-black uppercase tracking-widest">Equity Momentum</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
