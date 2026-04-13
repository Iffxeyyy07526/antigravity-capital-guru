'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

function getPasswordStrength(pwd: string): { level: number; label: string; color: string } {
  if (!pwd) return { level: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score <= 1) return { level: 1, label: 'Weak', color: '#dc2626' }
  if (score <= 2) return { level: 2, label: 'Medium', color: '#d97706' }
  return { level: 3, label: 'Strong', color: '#5DD62C' }
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
      <div className="glass-card auth-card p-8 sm:p-10 border-primary/[0.18]">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-primary text-3xl">✓</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-on-surface mb-3">Account Created!</h2>
          <p className="text-on-surface/60 font-body mb-6">Check your email to verify your account, then log in to start receiving signals.</p>
          <Link href="/login" className="btn-primary px-8 py-3">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface/30 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-outline-variant shadow-glow-sm">
      <div className="mb-10 text-center">
        <h1 className="font-display font-medium text-[32px] text-on-surface mb-2 tracking-tight">Create Account</h1>
        <p className="text-on-surface-muted text-[15px] font-body">Join the elite trading community</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-[14px] mb-8 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="form-label">Full Name *</label>
          <input type="text" {...register('full_name')} className="form-input" placeholder="Your full name" />
          {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="form-label">Email *</label>
          <input type="email" {...register('email')} className="form-input" placeholder="you@example.com" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="form-label">Phone (optional)</label>
          <input type="tel" {...register('phone')} className="form-input" placeholder="+91 9876543210" />
        </div>

        <div>
          <label className="form-label">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="form-input pr-12"
              placeholder="Min 8 chars, 1 uppercase, 1 number"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-sm cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}

          {/* Password strength */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= strength.level 
                        ? (strength.level === 1 ? 'bg-[#dc2626]' : strength.level === 2 ? 'bg-[#d97706]' : 'bg-[#5DD62C]')
                        : 'bg-on-surface/10'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs mt-1 ${
                strength.level === 1 ? 'text-[#dc2626]' : strength.level === 2 ? 'text-[#d97706]' : 'text-[#5DD62C]'
              }`}>{strength.label}</p>
            </div>
          )}
        </div>

        <div>
          <label className="form-label">Confirm Password *</label>
          <input type="password" {...register('confirm_password')} className="form-input" placeholder="Confirm your password" />
          {errors.confirm_password && <p className="text-red-400 text-xs mt-1">{errors.confirm_password.message}</p>}
        </div>

        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            {...register('terms')}
            className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            id="terms"
          />
          <label htmlFor="terms" className="text-on-surface/55 text-sm leading-relaxed cursor-pointer">
            I agree to the{' '}
            <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>
        {errors.terms && <p className="text-red-400 text-xs">{errors.terms.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-[16px] mt-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Please wait...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="text-center text-sm font-body mt-6">
        <span className="text-on-surface/55">Already have an account? </span>
        <Link href="/login" className="text-primary hover:underline font-medium">
          Login →
        </Link>
      </p>
    </div>
  )
}
