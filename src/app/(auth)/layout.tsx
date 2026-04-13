import Logo from '@/components/Logo'

const stats = [
  { value: '87.3%', label: 'Win Rate' },
  { value: '2.4K+', label: 'Members' },
  { value: '₹4.2Cr+', label: 'Profits' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Left Decorative Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-16 border-r border-outline-variant bg-surface">
        
        {/* Extremely subtle, minimal chart background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="none">
            {/* Grid */}
            <line x1="0" y1="200" x2="1000" y2="200" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="400" x2="1000" y2="400" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="600" x2="1000" y2="600" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="800" x2="1000" y2="800" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            
            <line x1="250" y1="0" x2="250" y2="1000" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="500" y1="0" x2="500" y2="1000" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="750" y1="0" x2="750" y2="1000" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

            {/* Pristine Institutional Chart Vector */}
            <polyline 
              points="-100,800 100,750 250,780 400,550 550,580 700,350 850,400 1100,100" 
              stroke="#5DD62C" 
              strokeWidth="2" 
              fill="none" 
            />
            
            <linearGradient id="fadeGlow" x1="0" x2="0" y1="0" y2="1">
               <stop offset="0%" stopColor="#5DD62C" stopOpacity="0.1" />
               <stop offset="100%" stopColor="#5DD62C" stopOpacity="0" />
            </linearGradient>
            <polygon 
              points="-100,800 100,750 250,780 400,550 550,580 700,350 850,400 1100,100 1100,1000 -100,1000" 
              fill="url(#fadeGlow)"
            />
          </svg>
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-lg">
          <Logo className="mb-12" size="large" />
          
          <h2 className="font-display font-medium text-[40px] leading-tight text-on-surface mb-6 tracking-tight">
            Join India&apos;s #1 Signal Platform.
          </h2>
          <p className="text-on-surface-muted font-body text-lg leading-relaxed mb-16 max-w-md">
            Execute trades instantly with mechanical precision. Real-time entries, automated stop-losses, and profit targets pushed directly to your Telegram.
          </p>

          <div className="grid grid-cols-3 gap-8 pb-8 border-b border-outline-variant">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-primary font-display font-medium text-3xl mb-1">{stat.value}</p>
                <p className="text-on-surface-muted text-xs font-label uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex items-start gap-4">
            <span className="text-xl">🏆</span>
            <p className="text-on-surface-muted text-sm leading-relaxed max-w-sm">
              &quot;Finally a signal service that actually works. The Telegram group is super active and the alerts are pristine.&quot; <br/>
              <span className="text-on-surface mt-2 block font-medium">— Priya M. (Pro Member)</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-[420px] relative z-10">
          <div className="flex justify-center mb-10 lg:hidden">
            <Logo size="large" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
