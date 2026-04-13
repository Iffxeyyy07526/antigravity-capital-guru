'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      if (authError.message.includes('Email not confirmed')) {
        setError('Email not verified. Check your inbox.')
      } else {
        setError('Invalid email or password.')
      }
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="mb-10 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
          >
            <ShieldCheck className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2 italic">WELCOME <span className="text-primary tracking-normal not-italic uppercase">BACK</span></h1>
          <p className="text-zinc-500 font-medium">Secure access to the Guru data network.</p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm font-bold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Mail className="w-3 h-3" />
              Guru ID (Email)
            </label>
            <div className="relative group">
              <input
                type="email"
                {...register('email')}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all group-hover:border-white/10"
                placeholder="id@thecapitalguru.net"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                Passcode
              </label>
              <Link href="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">
                Reset?
              </Link>
            </div>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all group-hover:border-white/10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] font-black mt-4 group"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Validating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Establish Connection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-12 text-center relative z-10">
          <p className="text-zinc-500 text-xs font-bold">
            No active clearance?{' '}
            <Link href="/register" className="text-primary hover:underline underline-offset-4 tracking-normal transition-all">
              Initiate Registration →
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-12 flex items-center justify-center gap-3 opacity-30 grayscale">
        <Rocket className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Guru Alpha Station</span>
      </div>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
