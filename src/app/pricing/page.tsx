'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'
import type { SubscriptionPlan } from '@/types'

export default function PricingPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_inr', { ascending: true })

    setPlans(data || [])
    setLoading(false)
  }

  const handleGetStarted = async (planId: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      router.push(`/payment?plan=${planId}`)
    } else {
      router.push(`/register?redirect=/payment?plan=${planId}`)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-on-surface mb-4">
              Choose Your Edge
            </h1>
            <p className="text-on-surface/55 text-lg font-body">
              Transparent pricing. No hidden fees.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface rounded-2xl p-7 border border-primary/15">
                  <div className="skeleton h-6 w-24 mb-4" />
                  <div className="skeleton h-12 w-36 mb-6" />
                  <div className="space-y-3 mb-8">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="skeleton h-4 w-full" />
                    ))}
                  </div>
                  <div className="skeleton h-12 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {plans.map((plan) => {
                const perMonth = plan.duration_months > 1
                  ? Math.round(plan.price_inr / plan.duration_months)
                  : null

                return (
                  <div
                    key={plan.id}
                    className={`relative bg-surface rounded-2xl p-7 transition-all duration-300 ${
                      plan.is_popular
                        ? 'border-2 border-primary shadow-glow-xl -translate-y-2'
                        : 'border border-primary/15'
                    }`}
                  >
                    {plan.badge_text && (
                      <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full ${
                        plan.is_popular ? 'bg-primary text-background' : 'bg-primary/15 text-primary'
                      }`}>
                        {plan.badge_text}
                      </div>
                    )}

                    <h3 className="font-display font-semibold text-on-surface text-xl mb-4 mt-2">{plan.name}</h3>

                    <div className="mb-2">
                      {plan.original_price_inr && (
                        <span className="text-on-surface/35 line-through text-lg mr-2">
                          ₹{plan.original_price_inr.toLocaleString()}
                        </span>
                      )}
                      <span className="font-display font-bold text-on-surface text-5xl">
                        ₹{plan.price_inr.toLocaleString()}
                      </span>
                      <span className="text-on-surface/55 text-sm ml-1">
                        /{plan.duration_months === 1 ? 'mo' : plan.duration_months === 6 ? '6mo' : 'yr'}
                      </span>
                    </div>

                    {perMonth && (
                      <p className="text-on-surface/55 text-sm mb-6">
                        ₹{perMonth.toLocaleString()}/month
                      </p>
                    )}
                    {!perMonth && <div className="mb-6" />}

                    <ul className="space-y-3 mb-8">
                      {(plan.features as string[])?.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-on-surface text-sm font-body">
                          <span className="text-primary mt-0.5">✓</span>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleGetStarted(plan.id)}
                      className="btn-primary w-full text-center py-3 cursor-pointer"
                    >
                      Get Started
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
