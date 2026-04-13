import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { Profile, UserSubscription } from '@/types'

interface AuthState {
  user: { id: string; email: string } | null
  profile: Profile | null
  subscription: UserSubscription | null
  loading: boolean
  setUser: (user: { id: string; email: string } | null) => void
  setProfile: (profile: Profile | null) => void
  setSubscription: (subscription: UserSubscription | null) => void
  fetchProfile: () => Promise<void>
  fetchSubscription: () => Promise<void>
  logout: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  subscription: null,
  loading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSubscription: (subscription) => set({ subscription }),

  fetchProfile: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) set({ profile: data })
  },

  fetchSubscription: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    set({ subscription: data || null })
  },

  logout: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, profile: null, subscription: null })
    window.location.href = '/'
  },

  initialize: async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      set({ user: { id: user.id, email: user.email! } })
      await get().fetchProfile()
      await get().fetchSubscription()
    }

    set({ loading: false })
  },
}))
