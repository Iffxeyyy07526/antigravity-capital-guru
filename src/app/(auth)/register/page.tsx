'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Rocket
} from 'lucide-react'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

function getPasswordStrength(pwd: string): { level: number; label: string; color: string } {
  if (!pwd) return { level: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' }
  if (score <= 2) return { level: 2, label: 'Medium', color: '#f59e0b' }
  return { level: 3, label: 'Strong', color: '#22c55e' }
}

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch('password', '')
  const strength = getPasswordStrength(password)

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
          
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-3xl font-black text-white tracking-tighter mb-4 italic">IDENTIFICATION <span className="text-primary tracking-normal not-italic uppercase">CONFIRMED</span></h2>
          <p className="text-zinc-500 font-medium mb-10">Verification protocol initiated. Check your inbox for the activation link.</p>
          
          <Link href="/login" className="block">
            <button className="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] font-black group">
              Back to Login
              <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="mb-10 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
          >
            <Rocket className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2 italic">JOIN THE <span className="text-primary tracking-normal not-italic uppercase">ELITE</span></h1>
          <p className="text-zinc-500 font-medium">Initiate your high-precision trading career.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <User className="w-3 h-3" />
                Full Legal Name
              </label>
              <input
                type="text"
                {...register('full_name')}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all"
                placeholder="Agent Name"
              />
              {errors.full_name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.full_name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all"
                placeholder="id@thecapitalguru.net"
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Phone className="w-3 h-3" />
              Contact Terminal (Optional)
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all"
              placeholder="+91 00000 00000"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                Set Passcode
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Strength Meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                          i <= strength.level 
                            ? (strength.level === 1 ? 'bg-red-500' : strength.level === 2 ? 'bg-amber-500' : 'bg-primary')
                            : 'bg-white/5'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 italic">Security Level: {strength.label}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                Confirm Passcode
              </label>
              <input
                type="password"
                {...register('confirm_password')}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-white font-medium placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 transition-all"
                placeholder="••••••••"
              />
              {errors.confirm_password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.confirm_password.message}</p>}
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4">
            <div className="relative flex items-center group">
              <input
                type="checkbox"
                {...register('terms')}
                id="terms"
                className="peer h-5 w-5 bg-black/40 border-white/10 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer opacity-0 absolute inset-0 z-10"
              />
              <div className="h-5 w-5 border border-white/10 rounded-md bg-black/40 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-all group-hover:border-primary/50">
                <CheckCircle2 className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <label htmlFor="terms" className="ml-3 text-xs text-zinc-500 font-medium leading-relaxed cursor-pointer select-none">
                I accept the <Link href="/terms-of-service" className="text-primary hover:underline underline-offset-4">Terms of Access</Link> and <Link href="/privacy-policy" className="text-primary hover:underline underline-offset-4">Privacy Protocols</Link>.
              </label>
            </div>
          </div>
          {errors.terms && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.terms.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] font-black mt-4 group"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Clearace...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-12 text-center relative z-10">
          <p className="text-zinc-500 text-xs font-bold">
            Already registered?{' '}
            <Link href="/login" className="text-primary hover:underline underline-offset-4 tracking-normal transition-all">
              Initialize Login →
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
