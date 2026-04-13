import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { withErrorHandler } from '@/lib/api-handler'
import { sendEmail } from '@/lib/email'
import { reminderTemplate } from '@/lib/email-templates'
import { config } from '@/lib/config'

/**
 * The Capital Guru - Automated Subscription Lifecycle Monitor
 * Runs Daily via Vercel Cron.
 * Handles:
 * 1. 7-Day Expiry Warnings
 * 2. 1-Day Final Warnings
 * 3. Immediate Expiry Termination & Notification
 */

export const GET = withErrorHandler(async (req: Request) => {
  // 1. Security Check
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${config.security.cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createServiceClient()
  const now = new Date()

  const processReminders = async (days: number) => {
    const targetDate = new Date(now)
    targetDate.setDate(targetDate.getDate() + days)
    const dateStr = targetDate.toISOString().split('T')[0]

    const { data: subs } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*), profiles(*)')
      .eq('status', 'active')
      .gte('end_date', `${dateStr}T00:00:00`)
      .lte('end_date', `${dateStr}T23:59:59`)

    if (!subs) return 0

    for (const sub of subs) {
      const profile = sub.profiles as { full_name?: string; email?: string } | null
      if (profile?.email) {
        await sendEmail({
          to: profile.email,
          subject: days === 1 ? '🚨 Last Chance: Access Expires Tomorrow' : '⏳ Subscription Insight: 7 Days Left',
          html: reminderTemplate(profile.full_name?.split(' ')[0] || 'Trader', days)
        })
      }
    }
    return subs.length
  }

  // 2. Execute 7-day and 1-day reminders
  const [sevenDayCount, oneDayCount] = await Promise.all([
    processReminders(7),
    processReminders(1)
  ])

  // 3. Process Immediate Expiries
  const { data: expired } = await supabase
    .from('user_subscriptions')
    .select('*, subscription_plans(*), profiles(*)')
    .eq('status', 'active')
    .lt('end_date', now.toISOString())

  if (expired) {
    for (const sub of expired) {
      // Update DB Status
      await supabase
        .from('user_subscriptions')
        .update({ status: 'expired', updated_at: now.toISOString() })
        .eq('id', sub.id)

      // Notify User
      const profile = sub.profiles as { full_name?: string; email?: string } | null
      if (profile?.email) {
        await sendEmail({
          to: profile.email,
          subject: 'Your Capital Guru Access has Expired',
          html: reminderTemplate(profile.full_name?.split(' ')[0] || 'Trader', 0) // 0 implies expired
        })
      }
    }
  }

  return NextResponse.json({
    success: true,
    processed: {
      sevenDayWarnings: sevenDayCount,
      oneDayWarnings: oneDayCount,
      expired: expired?.length || 0
    }
  })
})
