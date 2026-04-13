'use client'

import { useState } from 'react'

export default function FloatingTelegramButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[9999] md:bottom-6 max-md:bottom-20">
      {/* Tooltip */}
      {hovered && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-surface border border-primary/20 text-on-surface text-[13px] px-3 py-1.5 rounded-lg whitespace-nowrap opacity-100 transition-opacity duration-200">
          Chat with Support
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-surface border-y-[6px] border-y-transparent" />
        </div>
      )}

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => window.open('https://t.me/thecapitalguru_support', '_blank')}
        className="w-14 h-14 max-md:w-12 max-md:h-12 rounded-full bg-primary flex items-center justify-center shadow-glow-lg animate-tcg-pulse hover:scale-[1.08] hover:shadow-[0_6px_28px_rgba(93,214,44,0.65)] transition-all duration-200 cursor-pointer"
        aria-label="Chat with support on Telegram"
      >
        <svg
          className="w-7 h-7 max-md:w-[22px] max-md:h-[22px]"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </button>
    </div>
  )
}
