'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import type { UserSubscription } from '@/types'

export default function SubscriptionPage() {
  const { subscription, fetchSubscription } = useAuthStore()
  const [history, setHistory] = useState<UserSubscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscription()
    fetchHistory()
  }, [fetchSubscription])

  const fetchHistory = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setHistory(data || [])
    setLoading(false)
  }

  const plan = subscription?.subscription_plans
  const isActive = subscription?.status === 'active'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="font-display font-bold text-2xl text-on-surface">My Subscription</h1>

      {/* Current plan card */}
      {isActive && plan ? (
        <div className="bg-surface border border-primary/25 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-primary/[0.12] border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-dot-pulse" /> ACTIVE
            </span>
          </div>

          <h2 className="font-display font-bold text-xl text-on-surface mb-4">{plan.name} Plan</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-on-surface/50 text-xs font-label uppercase">Duration</p>
              <p className="text-on-surface font-semibold">{plan.duration_months} Months</p>
            </div>
            <div>
              <p className="text-on-surface/50 text-xs font-label uppercase">Start Date</p>
              <p className="text-on-surface font-semibold">{new Date(subscription.start_date).toLocaleDateString('en-IN')}</p>
            </div>
            <div>
              <p className="text-on-surface/50 text-xs font-label uppercase">End Date</p>
              <p className="text-on-surface font-semibold">{new Date(subscription.end_date).toLocaleDateString('en-IN')}</p>
            </div>
            <div>
              <p className="text-on-surface/50 text-xs font-label uppercase">Payment ID</p>
              <p className="text-on-surface font-semibold text-sm truncate">{subscription.razorpay_payment_id || '—'}</p>
            </div>
          </div>

          {/* Features */}
          {plan.features && (
            <div className="mb-6">
              <p className="text-on-surface/50 text-xs font-label uppercase mb-3">Included Features</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(plan.features as string[]).map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-on-surface text-sm">
                    <span className="text-primary">✓</span> {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {plan.name !== 'Elite' && (
            <Link href="/pricing" className="btn-primary px-6 py-2.5 text-sm inline-block">
              Upgrade Plan
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-surface border border-amber-500/30 rounded-2xl p-8 text-center">
          <p className="text-on-surface/60 mb-4">No active subscription.</p>
          <Link href="/pricing" className="btn-primary px-8 py-3">View Plans →</Link>
        </div>
      )}

      {/* Subscription History */}
      <div className="bg-surface border border-primary/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/[0.06]">
          <h3 className="font-display font-semibold text-on-surface">Subscription History</h3>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2].map((i) => <div key={i} className="skeleton h-12 rounded" />)}
          </div>
        ) : history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/[0.06]">
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Plan</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Period</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((sub) => (
                  <tr key={sub.id} className="border-t border-white/[0.04]">
                    <td className="px-6 py-3.5 text-on-surface text-sm font-semibold">
                      {sub.subscription_plans?.name || '—'}
                    </td>
                    <td className="px-6 py-3.5 text-on-surface/70 text-sm">
                      {new Date(sub.start_date).toLocaleDateString('en-IN')} → {new Date(sub.end_date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        sub.status === 'active' ? 'bg-primary/[0.12] text-primary' :
                        sub.status === 'expired' ? 'bg-on-surface/10 text-on-surface/50' :
                        'bg-red-500/[0.12] text-red-400'
                      }`}>
                        {sub.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-on-surface/40 text-sm text-center">No subscription history.</p>
        )}
      </div>
    </div>
  )
}
