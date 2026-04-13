import type { Metadata, Viewport } from 'next'
import { Toaster } from 'react-hot-toast'
import FloatingTelegramButton from '@/components/FloatingTelegramButton'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Capital Guru | NSE/BSE Stock Market Signals',
  description:
    "India's most precise stock market signal platform. Get real-time buy/sell signals for NSE & BSE stocks delivered directly to your Telegram.",
  keywords: ['stock market signals', 'NSE signals', 'BSE signals', 'Indian stock market', 'trading signals', 'intraday signals'],
  verification: {
    google: 'bzs1fz4fAgQHW30f7nnHkVAJMxNvFZVpJVnWCxd6khc',
  },
  openGraph: {
    title: 'The Capital Guru | NSE/BSE Stock Market Signals',
    description: "India's most precise stock market signal platform.",
    url: 'https://thecapitalguru.net',
    siteName: 'The Capital Guru',
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://thecapitalguru.net'),
}

export const viewport: Viewport = {
  themeColor: '#5DD62C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body bg-background text-on-surface antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#202020',
              color: '#F8F8F8',
              border: '1px solid rgba(93,214,44,0.25)',
              borderRadius: '10px',
              fontSize: '14px',
            },
            iconTheme: {
              primary: '#5DD62C',
              secondary: '#0F0F0F',
            },
          }}
        />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <FloatingTelegramButton />
      </body>
    </html>
  )
}
