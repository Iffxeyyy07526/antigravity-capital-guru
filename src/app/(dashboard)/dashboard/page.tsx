'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import type { Payment } from '@/types'

export default function DashboardPage() {
  const { profile, subscription, fetchSubscription } = useAuthStore()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loadingPayments, setLoadingPayments] = useState(true)

  useEffect(() => {
    fetchSubscription()
    fetchPayments()
  }, [fetchSubscription])

  const fetchPayments = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('payments')
      .select('*, user_subscriptions(*, subscription_plans(*))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3)

    setPayments(data || [])
    setLoadingPayments(false)
  }

  const plan = subscription?.subscription_plans
  const isActive = subscription?.status === 'active'
  const endDate = subscription ? new Date(subscription.end_date) : null
  const startDate = subscription ? new Date(subscription.start_date) : null
  const now = new Date()
  const daysRemaining = endDate ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0
  const totalDays = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const progressPercent = totalDays > 0 ? Math.round(((totalDays - daysRemaining) / totalDays) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ① SUBSCRIPTION STATUS CARD */}
      <div className={`bg-surface rounded-2xl p-6 sm:p-8 border ${isActive ? 'border-primary/25' : 'border-amber-500/30'}`}>
        {isActive && plan ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-primary/[0.12] border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-dot-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-on-surface mb-2">
              {plan.name} Plan — {plan.duration_months} {plan.duration_months === 1 ? 'Month' : 'Months'}
            </h2>
            <p className="text-on-surface/60 text-sm mb-4 font-body">
              {startDate?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} → {endDate?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-on-surface/80 text-sm mb-4 font-body">
              <span className="font-semibold">{daysRemaining}</span> days remaining
            </p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-on-surface/[0.08] rounded-full mb-6">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500"
                ref={(el) => { if (el) el.style.width = `${Math.min(progressPercent, 100)}%` }}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {plan.telegram_group_link && (
                <button
                  onClick={() => window.open(plan.telegram_group_link, '_blank')}
                  className="btn-primary px-6 py-3 text-sm"
                >
                  🔗 Join Telegram Group
                </button>
              )}
              <button
                onClick={() => {
                  if (plan.telegram_group_link) {
                    navigator.clipboard.writeText(plan.telegram_group_link)
                  }
                }}
                className="btn-ghost px-5 py-3 text-sm"
              >
                📋 Copy Telegram Link
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <span className="inline-flex items-center gap-2 bg-amber-500/[0.12] border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              NO ACTIVE PLAN
            </span>
            <p className="text-on-surface/60 text-sm mb-6 font-body">
              You don&apos;t have an active subscription yet.
            </p>
            <Link href="/pricing" className="btn-primary px-8 py-3">
              View Pricing Plans →
            </Link>
          </div>
        )}
      </div>

      {/* Renewal reminder */}
      {isActive && daysRemaining <= 7 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-wrap items-center gap-4">
          <p className="text-amber-500 text-sm font-body flex-1">
            ⚠️ Your subscription expires in <strong>{daysRemaining} days</strong>! Renew now to keep Telegram access.
          </p>
          <Link href="/pricing" className="bg-amber-500 text-background font-bold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
            Renew Now →
          </Link>
        </div>
      )}

      {/* ② STAT MINI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-primary/10 rounded-xl p-5">
          <p className="text-on-surface/50 text-xs font-label uppercase tracking-wider mb-1">Member Since</p>
          <p className="text-primary font-display font-bold text-lg">
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
              : '—'}
          </p>
        </div>
        <div className="bg-surface border border-primary/10 rounded-xl p-5">
          <p className="text-on-surface/50 text-xs font-label uppercase tracking-wider mb-1">Current Plan</p>
          <p className="text-on-surface font-display font-bold text-lg">
            {plan ? `${plan.name} ${plan.duration_months}M` : 'None'}
          </p>
        </div>
        <div className="bg-surface border border-primary/10 rounded-xl p-5">
          <p className="text-on-surface/50 text-xs font-label uppercase tracking-wider mb-1">Days Remaining</p>
          <p className="text-primary font-display font-bold text-2xl">{isActive ? daysRemaining : '—'}</p>
        </div>
      </div>

      {/* ③ RECENT PAYMENTS */}
      <div className="bg-surface border border-primary/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/[0.06] flex items-center justify-between">
          <h3 className="font-display font-semibold text-on-surface">Recent Payments</h3>
          <Link href="/dashboard/billing" className="text-primary text-sm hover:underline">View All →</Link>
        </div>

        {loadingPayments ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-12 rounded" />
            ))}
          </div>
        ) : payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/[0.06]">
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-white/[0.04]">
                    <td className="px-6 py-3.5 text-on-surface text-sm">
                      {new Date(p.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-3.5 text-on-surface text-sm font-semibold">₹{p.amount_inr.toLocaleString()}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        p.status === 'success' ? 'bg-primary/[0.12] text-primary' : 'bg-red-500/[0.12] text-red-400'
                      }`}>
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-on-surface/40 text-sm text-center">No payments yet.</p>
        )}
      </div>

      {/* ⑤ HOW TO USE CARD */}
      <div className="bg-surface border border-primary/[0.08] rounded-xl p-6">
        <h3 className="font-display font-semibold text-on-surface mb-4">How to Access Your Signals</h3>
        <div className="space-y-3">
          {[
            { num: '1', text: 'Click "Join Telegram Group" above' },
            { num: '2', text: 'Request to join the private group' },
            { num: '3', text: 'Approved within minutes — start receiving signals' },
          ].map((step) => (
            <div key={step.num} className="flex items-center gap-3">
              <span className="w-7 h-7 bg-primary/15 rounded-full flex items-center justify-center text-primary font-display font-bold text-xs">
                {step.num}
              </span>
              <span className="text-on-surface/70 text-sm font-body">{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
