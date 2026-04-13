'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <div className="w-24 h-24 bg-zinc-900 border border-white/5 rounded-3xl mx-auto flex items-center justify-center mb-12 shadow-2xl relative">
            <Search className="text-zinc-500 w-10 h-10" />
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t border-primary rounded-3xl opacity-40 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            />
        </div>

        <h1 className="text-[120px] md:text-[180px] font-black text-white leading-none tracking-tighter mb-4 opacity-10 select-none">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6 mt-[-60px] md:mt-[-90px]">
          Signal <span className="text-primary italic">Lost.</span>
        </h2>
        
        <p className="text-zinc-500 text-lg md:text-xl max-w-md mx-auto mb-12 font-medium">
          The coordinates you&apos;re looking for don&apos;t exist in our current market index.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="btn-primary py-4 px-10 flex items-center justify-center gap-2 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return Home
            </button>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="btn-ghost py-4 px-10 border-zinc-800 text-zinc-400 hover:text-white"
          >
            Retry Connection
          </button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex items-center gap-2">
        <Rocket className="w-4 h-4 text-primary opacity-50" />
        <span className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em]">Capital Guru Data Network</span>
      </div>
    </div>
  )
}
