'use client'

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/auth-store'
import toast from 'react-hot-toast'
import type { SubscriptionPlan, RazorpayPaymentResponse } from '@/types'

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plan')
  const { user, profile } = useAuthStore()
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (planId) fetchPlan()
  }, [planId])

  const fetchPlan = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single()

    setPlan(data)
    setLoading(false)
  }

  const gstAmount = plan ? Math.round(plan.price_inr * 0.18) : 0
  const totalAmount = plan ? plan.price_inr + gstAmount : 0

  const handlePayment = useCallback(async () => {
    if (!plan || processing) return
    setProcessing(true)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      // Step 1: Create order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ planId: plan.id }),
      })

      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order')

      // Step 2: Open Razorpay
      const rzp = new window.Razorpay({
        key: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'The Capital Guru',
        description: `${plan.name} Subscription`,
        order_id: orderData.orderId,
        theme: { color: '#5DD62C' },
        prefill: {
          name: profile?.full_name || '',
          email: user?.email || '',
        },
        handler: async (response: RazorpayPaymentResponse) => {
          // Step 3: Verify
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.access_token}`,
              },
              body: JSON.stringify(response),
            })

            const verifyData = await verifyRes.json()
            if (verifyRes.ok && verifyData.success) {
              toast.success('Payment successful! Your Telegram link is ready.', {
                style: { background: '#337418', color: '#F8F8F8', border: '1px solid rgba(93,214,44,0.5)' },
                duration: 5000,
              })
              router.push('/dashboard')
            } else {
              toast.error('Payment verification failed. Contact support.')
            }
          } catch {
            toast.error('Payment verification error. Contact support.')
          }
          setProcessing(false)
        },
      })

      rzp.open()
    } catch (err: any) {
      toast.error(err.message || 'Payment failed. Please try again.')
      setProcessing(false)
    }
  }, [plan, processing, profile, user, router])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="skeleton h-96 rounded-2xl" />
              <div className="skeleton h-96 rounded-2xl" />
            </div>
          </div>
        </main>
      </>
    )
  }

  if (!plan) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-on-surface/60 mb-4">Plan not found.</p>
            <a href="/pricing" className="btn-primary px-6 py-3">View Plans</a>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT — Plan Summary */}
            <div className="bg-surface border border-primary/20 rounded-2xl p-7">
              <h2 className="font-display font-bold text-2xl text-on-surface mb-4">{plan.name} Plan</h2>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-6">
                {plan.duration_months} {plan.duration_months === 1 ? 'Month' : 'Months'}
              </span>

              <ul className="space-y-3 mb-8">
                {(plan.features as string[])?.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-on-surface text-sm font-body">
                    <span className="text-primary mt-0.5">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="https://t.me/thecapitalguru_support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/80 text-[13px] hover:text-primary transition-colors"
              >
                💬 Need help? Chat on Telegram →
              </a>
            </div>

            {/* RIGHT — Order Summary + Pay */}
            <div className="bg-surface border border-primary/15 rounded-2xl p-7">
              <h3 className="font-display font-semibold text-lg text-on-surface mb-6">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface/60">Plan</span>
                  <span className="text-on-surface font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface/60">Subtotal</span>
                  <span className="text-on-surface">₹{plan.price_inr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface/60">GST (18%)</span>
                  <span className="text-on-surface">₹{gstAmount.toLocaleString()}</span>
                </div>
                <div className="h-px bg-on-surface/[0.08]" />
                <div className="flex justify-between">
                  <span className="text-on-surface font-semibold">Total</span>
                  <span className="text-on-surface font-display font-bold text-xl">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 my-6">
                {['🔒 256-bit SSL', '✅ Razorpay Secured', '📋 GST Invoice'].map((badge) => (
                  <span
                    key={badge}
                    className="bg-primary/[0.06] border border-primary/15 text-primary text-[11px] font-medium px-3 py-1 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="btn-primary w-full py-4 text-[17px] mt-4"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay Now ₹${totalAmount.toLocaleString()}`
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center p-8 text-on-surface/50">Loading checkout...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
