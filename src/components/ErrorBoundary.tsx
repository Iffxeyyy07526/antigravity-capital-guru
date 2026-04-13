'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F0C] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full glass-card p-10 border-red-500/20">
            <h2 className="font-display font-medium text-3xl text-on-surface mb-4">Something went wrong</h2>
            <p className="text-on-surface-muted mb-8 text-lg font-body">
              An unexpected error occurred. Our team has been notified.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="btn-primary w-full"
              >
                Try again
              </button>
              <Link href="/" className="btn-ghost w-full">
                Go back home
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-8 p-4 bg-black/40 rounded-lg text-red-400 text-xs text-left overflow-auto max-h-40">
                {this.state.error?.message}
                {this.state.error?.stack}
              </pre>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
