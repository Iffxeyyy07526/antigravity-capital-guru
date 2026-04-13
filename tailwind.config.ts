import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F0C',
        surface: '#202020',
        'surface-dim': '#0a0a0a',
        'surface-container': '#2a2a2a',
        'surface-container-high': '#323232',
        'surface-container-highest': '#3d3d3d',
        primary: '#5DD62C',
        'primary-container': '#337418',
        secondary: '#22C55E',
        'on-surface': '#E5E7EB',
        'on-surface-muted': '#9CA3AF',
        'outline-variant': 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(93,214,44,0.4)',
        'glow-sm': '0 0 20px rgba(93,214,44,0.18)',
        'glow-lg': '0 4px 28px rgba(93,214,44,0.45)',
        'glow-xl': '0 0 40px rgba(93,214,44,0.2), 0 0 80px rgba(93,214,44,0.08)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'tcg-pulse': {
          '0%': { boxShadow: '0 4px 20px rgba(93,214,44,0.45), 0 0 0 0 rgba(93,214,44,0.5)' },
          '70%': { boxShadow: '0 4px 20px rgba(93,214,44,0.45), 0 0 0 14px rgba(93,214,44,0)' },
          '100%': { boxShadow: '0 4px 20px rgba(93,214,44,0.45), 0 0 0 0 rgba(93,214,44,0)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'dash': {
          'to': { strokeDashoffset: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'tcg-pulse': 'tcg-pulse 3s ease-out infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
