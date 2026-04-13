'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Payment } from '@/types'

export default function BillingPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const perPage = 10

  useEffect(() => {
    fetchPayments()
  }, [page])

  const fetchPayments = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('payments')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(page * perPage, (page + 1) * perPage - 1)

    setPayments(data || [])
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="font-display font-bold text-2xl text-on-surface">Billing History</h1>

      <div className="bg-surface border border-primary/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton h-12 rounded" />)}
          </div>
        ) : payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/[0.06]">
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Payment ID</th>
                  <th className="text-left px-6 py-3 text-on-surface/65 text-[11px] font-label uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5 text-on-surface text-sm">
                      {new Date(p.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-3.5 text-on-surface text-sm font-semibold">₹{p.amount_inr.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-on-surface/60 text-xs font-mono">{p.razorpay_payment_id || '—'}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        p.status === 'success' ? 'bg-primary/[0.12] text-primary' :
                        p.status === 'failed' ? 'bg-red-500/[0.12] text-red-400' :
                        p.status === 'refunded' ? 'bg-amber-500/[0.12] text-amber-400' :
                        'bg-on-surface/10 text-on-surface/50'
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
          <div className="p-12 text-center">
            <p className="text-on-surface/40 text-sm mb-4">No payments found.</p>
            <a href="https://t.me/thecapitalguru_support" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
              Need help? Chat on Telegram →
            </a>
          </div>
        )}

        {/* Pagination */}
        {payments.length >= perPage && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-white/[0.04]">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="text-primary text-sm font-medium disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <span className="text-on-surface/40 text-xs">Page {page + 1}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="text-primary text-sm font-medium cursor-pointer"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
