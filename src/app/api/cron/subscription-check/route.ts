/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendExpiryReminderEmail, sendExpiredEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createServiceClient()
  const now = new Date()

  try {
    // 1. Subscriptions expiring in 7 days
    const sevenDaysLater = new Date(now)
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)
    const sevenDayStr = sevenDaysLater.toISOString().split('T')[0]

    const { data: expiringSeven } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*), profiles(*)')
      .eq('status', 'active')
      .gte('end_date', `${sevenDayStr}T00:00:00`)
      .lte('end_date', `${sevenDayStr}T23:59:59`)

    for (const sub of expiringSeven || []) {
      const profile = sub.profiles as any
      const plan = sub.subscription_plans as any
      if (profile && plan) {
        await sendExpiryReminderEmail({
          to: profile.email || '',
          first_name: profile.full_name?.split(' ')[0] || 'Trader',
          plan_name: plan.name,
          end_date: new Date(sub.end_date).toLocaleDateString('en-IN'),
          days_remaining: 7,
        })
      }
    }

    // 2. Subscriptions expiring in 1 day
    const oneDayLater = new Date(now)
    oneDayLater.setDate(oneDayLater.getDate() + 1)
    const oneDayStr = oneDayLater.toISOString().split('T')[0]

    const { data: expiringOne } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*), profiles(*)')
      .eq('status', 'active')
      .gte('end_date', `${oneDayStr}T00:00:00`)
      .lte('end_date', `${oneDayStr}T23:59:59`)

    for (const sub of expiringOne || []) {
      const profile = sub.profiles as any
      const plan = sub.subscription_plans as any
      if (profile && plan) {
        await sendExpiryReminderEmail({
          to: profile.email || '',
          first_name: profile.full_name?.split(' ')[0] || 'Trader',
          plan_name: plan.name,
          end_date: new Date(sub.end_date).toLocaleDateString('en-IN'),
          days_remaining: 1,
        })
      }
    }

    // 3. Expired subscriptions
    const { data: expired } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*), profiles(*)')
      .eq('status', 'active')
      .lt('end_date', now.toISOString())

    for (const sub of expired || []) {
      // Update status
      await supabase
        .from('user_subscriptions')
        .update({ status: 'expired', updated_at: now.toISOString() })
        .eq('id', sub.id)

      const profile = sub.profiles as any
      const plan = sub.subscription_plans as any
      if (profile && plan) {
        await sendExpiredEmail({
          to: profile.email || '',
          first_name: profile.full_name?.split(' ')[0] || 'Trader',
          plan_name: plan.name,
          end_date: new Date(sub.end_date).toLocaleDateString('en-IN'),
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: {
        sevenDayReminders: expiringSeven?.length || 0,
        oneDayReminders: expiringOne?.length || 0,
        expired: expired?.length || 0,
      },
    })
  } catch (error: any) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}
