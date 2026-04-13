'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Crown, Rocket, Star } from 'lucide-react'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Invest in your <span className="text-primary text-glow-green italic">Alpha</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Precision signals for the Indian market. Choose the plan that fuels your trading edge.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="skeleton"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[600px] rounded-3xl skeleton-shimmer border border-white/5 opacity-50" />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
              >
                {plans.map((plan, index) => {
                  const isPro = plan.is_popular
                  const isElite = plan.name.toLowerCase().includes('elite') || index === 2
                  
                  return (
                    <motion.div
                      key={plan.id}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      className={`relative flex flex-col p-8 rounded-[32px] transition-all duration-300 ${
                        isPro 
                          ? 'bg-zinc-900/40 border-2 border-primary/50 shadow-[0_0_40px_rgba(34,197,94,0.15)] z-20 scale-[1.05] pro-glow' 
                          : 'bg-zinc-900/20 border border-white/10 z-10'
                      }`}
                    >
                      {/* Badge System */}
                      {isPro && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="badge-premium whitespace-nowrap flex items-center gap-1.5"
                          >
                            <Crown className="w-3.5 h-3.5" />
                            Most Popular
                          </motion.div>
                        </div>
                      )}
                      
                      {isElite && !isPro && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-white text-black font-extrabold text-[11px] px-4 py-1 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-1.5"
                          >
                            <Star className="w-3.5 h-3.5 fill-black" />
                            Best Value
                          </motion.div>
                        </div>
                      )}

                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                          {isPro ? <Zap className="w-5 h-5 text-primary fill-primary" /> : <Rocket className="w-5 h-5 text-zinc-500" />}
                          <h3 className={`text-xl font-bold uppercase tracking-widest ${isPro ? 'text-primary' : 'text-white'}`}>
                            {plan.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-baseline gap-1 mt-4">
                          <span className="text-zinc-500 text-2xl font-semibold mr-1">₹</span>
                          <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                            {plan.price_inr.toLocaleString()}
                          </span>
                          <span className="text-zinc-500 font-medium text-lg ml-1">
                            /{plan.duration_months === 1 ? 'mo' : `${plan.duration_months}mo`}
                          </span>
                        </div>
                        
                        {plan.original_price_inr && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-zinc-600 line-through text-sm decoration-primary/40">
                              ₹{plan.original_price_inr.toLocaleString()}
                            </span>
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded uppercase">
                              Save {Math.round((1 - plan.price_inr/plan.original_price_inr) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>

                      <ul className="space-y-4 mb-10 flex-grow">
                        {(plan.features as string[])?.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 group">
                            <div className={`mt-1 flex-shrink-0 transition-colors duration-300 ${isPro ? 'text-primary' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                              <Check className="w-4 h-4 text-inherit stroke-[3]" />
                            </div>
                            <span className="text-zinc-400 text-sm font-medium leading-tight">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleGetStarted(plan.id)}
                        className={`w-full group relative overflow-hidden transition-all duration-300 ${isPro ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Get Started
                        </span>
                        {isPro && (
                          <motion.div 
                            className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                          />
                        )}
                      </button>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 text-center p-12 rounded-[40px] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"
          >
            <h4 className="text-white font-bold text-2xl mb-4">Questions about our desk?</h4>
            <p className="text-zinc-500 mb-8 max-w-lg mx-auto">Our precision team is available for Institutional & High-Volume support. Reach out for custom setups.</p>
            <a href="mailto:support@thecapitalguru.net" className="text-primary font-bold hover:underline underline-offset-8">
              Contact Precision Desk &rarr;
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
