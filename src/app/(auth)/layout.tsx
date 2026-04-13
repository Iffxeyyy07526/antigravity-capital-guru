'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, ShieldCheck, Quote } from 'lucide-react'

const stats = [
  { value: '87.3%', label: 'Win Rate' },
  { value: '2.4K+', label: 'Clearance' },
  { value: '₹4.2Cr+', label: 'Deployed' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] flex selection:bg-primary/30 text-white font-sans">
      {/* ── Desktop Visual Console ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-20 border-r border-white/5 bg-[#080808]">
        
        {/* Background Grid & Particles */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Dynamic Signal Path */}
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              d="M 0 800 Q 250 750 500 500 T 1000 200" 
              stroke="#22c55e" 
              strokeWidth="1" 
              fill="none" 
            />
          </svg>
        </div>

        {/* Floating Accents */}
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-48 h-48 bg-primary/5 blur-[80px] rounded-full" />

        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="inline-flex items-center gap-3 mb-16 group">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
              <Rocket className="w-6 h-6 text-primary group-hover:text-inherit" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Capital <span className="text-primary not-italic">Guru</span></span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl font-black leading-tight tracking-tighter mb-8 italic">
              UNLIMITED <span className="text-primary not-italic uppercase">CLEARANCE</span> <br/>
              INTO THE ALPHA.
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed mb-16 max-w-md">
              Secure your high-precision data stream. Join a network of 2,400+ serious traders executing with mechanical institutional edge.
            </p>

            <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5 mb-16">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-primary font-black text-3xl mb-1 tracking-tighter">{stat.value}</p>
                  <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest leading-none">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-3xl p-6 relative group"
            >
              <Quote className="absolute -top-3 -left-3 text-primary w-8 h-8 opacity-20" />
              <p className="text-zinc-400 text-sm italic leading-relaxed mb-4">
                &quot;The transition from guessing to institutional execution was immediate. The signal quality is unmatched in the NSE segment.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
                <div>
                  <p className="text-xs font-black uppercase text-white tracking-widest">Sanjay K.</p>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase">Alpha Member 2024</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Right Form Engine ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-20 relative lg:bg-[#050505] bg-radial-gradient">
        {/* Mobile Logo Only */}
        <div className="lg:hidden absolute top-12 left-1/2 -translate-x-1/2">
             <Link href="/" className="inline-flex items-center gap-3 group">
                <Rocket className="w-6 h-6 text-primary" />
                <span className="text-xl font-black tracking-tighter italic">CAPITAL GURU</span>
            </Link>
        </div>
        
        <div className="w-full max-w-[480px] relative z-10 py-20 lg:py-0">
          {children}
        </div>
        
        {/* Subtle Bottom Branding */}
        <div className="absolute bottom-10 flex items-center gap-10 opacity-20 select-none hidden md:flex">
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">SECURE ACCESS</span>
             <ShieldCheck className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">DATA TERMINAL</span>
        </div>
      </div>
    </div>
  )
}
