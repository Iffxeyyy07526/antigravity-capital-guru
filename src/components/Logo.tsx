import Link from 'next/link'

export default function Logo({ className = '', size = 'default', monochrome = false }: { className?: string; size?: 'small' | 'default' | 'large', monochrome?: boolean }) {
  const sizes = {
    small: { icon: 28, text: 'text-[17px]', gap: 'gap-3' },
    default: { icon: 34, text: 'text-[21px]', gap: 'gap-3.5' },
    large: { icon: 46, text: 'text-[28px]', gap: 'gap-4' },
  }

  const s = sizes[size]

  const Icon = () => (
    <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <defs>
        {/* World-class unified J-curve clip path. 
            Starts flat, exponentially explodes vertically exactly across the 3 monolithic segments. */}
        <clipPath id="institutional-curve">
          <path d="M4,36 L4,26 Q16,26 36,4 L36,36 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#institutional-curve)" fill="currentColor">
        {/* Three bold, precision-aligned vertical forms */}
        <rect x="4" y="0" width="8" height="40" />
        <rect x="16" y="0" width="8" height="40" />
        <rect x="28" y="0" width="8" height="40" />
      </g>
    </svg>
  )

  if (size === 'small') {
    return (
      <Link href="/" className={`inline-flex items-center no-underline text-on-surface hover:opacity-90 transition-opacity ${className}`}>
        <Icon />
      </Link>
    )
  }

  return (
    <Link href="/" className={`inline-flex items-center ${s.gap} no-underline text-on-surface hover:opacity-90 transition-opacity ${className}`}>
      <Icon />
      <span className={`font-display font-medium tracking-[0.04em] ${s.text} leading-none`}>
        THE CAPITAL <span className={monochrome ? 'text-inherit' : 'text-primary'}>GURU</span>
      </span>
    </Link>
  )
}
