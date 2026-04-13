'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="glass-card auth-card p-8 sm:p-10 border-primary/[0.18]">
      <div className="mb-8">
        <h1 className="font-display font-bold text-[28px] text-on-surface mb-2">Reset Your Password</h1>
        <p className="text-on-surface/55 text-sm font-body">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      {success ? (
        <div className="bg-primary/10 border border-primary/30 text-primary rounded-lg px-4 py-4 text-sm mb-6">
          <p className="font-semibold mb-1">Reset link sent!</p>
          <p className="text-on-surface/60">Check your inbox for the password reset link.</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register('email')}
                className="form-input"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </>
      )}

      <p className="text-center text-sm font-body mt-6">
        <Link href="/login" className="text-primary hover:underline font-medium">
          ← Back to Login
        </Link>
      </p>
    </div>
  )
}
