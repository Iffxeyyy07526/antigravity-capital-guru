'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useAuthStore } from '@/stores/auth-store'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'My Subscription', href: '/dashboard/subscription', icon: '💎' },
  { label: 'Billing History', href: '/dashboard/billing', icon: '🧾' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { profile, loading, initialize, logout } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-on-surface/55 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'Trader'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-surface border-r border-primary/10 fixed inset-y-0 left-0 z-40">
        <div className="p-6">
          <Logo size="small" />
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary border-l-[3px] border-primary font-semibold'
                    : 'text-on-surface/55 hover:bg-white/[0.04] hover:text-on-surface/85'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary/[0.06]">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-on-surface/40 hover:text-red-400 transition-colors w-full cursor-pointer"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface-container/85 backdrop-blur-[12px] border-b border-primary/[0.08]">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4 lg:hidden">
              <Logo size="small" />
            </div>
            <p className="hidden lg:block font-display text-lg text-on-surface">
              {greeting}, {firstName} 👋
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/thecapitalguru_support"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-[13px] font-medium px-3.5 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                💬 Support
              </a>
              <div className="w-9 h-9 bg-primary-container rounded-full flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-primary/10">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface/40'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
