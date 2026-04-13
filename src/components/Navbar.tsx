'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Menu, X, Rocket } from 'lucide-react'


const navLinks = [
  { label: 'Signals', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/#footer' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 transition-colors group-hover:bg-primary/20"
          >
            <Rocket className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="text-xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">
            CAPITAL GURU
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-zinc-400 text-sm font-bold uppercase tracking-widest hover:text-white hover:text-glow-green transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l border-white/10 pl-10">
            <Link href="/login" className="text-zinc-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register">
              <button className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 group/btn">
                Get Started
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-white p-2 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-zinc-300 text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <Link href="/login" className="block text-center text-zinc-400 font-bold uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <button className="btn-primary w-full py-4 uppercase tracking-widest text-sm font-bold">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
