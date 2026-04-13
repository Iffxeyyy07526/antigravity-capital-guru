/**
 * The Capital Guru - Production Configuration & Environment Validation
 * Centralizes all environment variables with strict validation and safe fallbacks.
 */

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value && process.env.NODE_ENV === 'production') {
    // In production, we want to know if critical variables are missing
    console.warn(`[Config] Warning: Critical environment variable ${key} is missing.`)
  }
  return value || ''
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  
  app: {
    url: getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    name: 'The Capital Guru',
    telegramSupport: getEnv('NEXT_PUBLIC_TELEGRAM_SUPPORT', 'https://t.me/thecapitalguru_support'),
  },

  supabase: {
    url: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRole: getEnv('SUPABASE_SERVICE_ROLE_KEY'),
  },

  razorpay: {
    keyId: getEnv('NEXT_PUBLIC_RAZORPAY_KEY_ID'),
    keySecret: getEnv('RAZORPAY_KEY_SECRET'),
    webhookSecret: getEnv('RAZORPAY_WEBHOOK_SECRET'),
  },

  resend: {
    apiKey: getEnv('RESEND_API_KEY'),
    fromEmail: getEnv('RESEND_FROM_EMAIL', 'noreply@thecapitalguru.net'),
    fromName: getEnv('RESEND_FROM_NAME', 'The Capital Guru'),
  },

  security: {
    cronSecret: getEnv('CRON_SECRET'),
  }
}

/**
 * Validates that all critical production variables are present.
 * Should be called in API routes or server components to prevent crashes.
 */
export const validateConfig = () => {
  const criticalKeys = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'RESEND_API_KEY'
  ]
  
  if (config.isProd) {
    const missing = criticalKeys.filter(key => !process.env[key])
    if (missing.length > 0) {
      throw new Error(`Missing critical environment variables: ${missing.join(', ')}`)
    }
  }
}
