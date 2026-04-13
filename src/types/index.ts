export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
  status: 'active' | 'suspended' | 'deleted'
}

export interface SubscriptionPlan {
  id: string
  name: string
  duration_months: number
  price_inr: number
  original_price_inr: number | null
  telegram_group_link: string
  features: string[]
  badge_text: string | null
  is_popular: boolean
  is_active: boolean
  created_at: string
}

export interface UserSubscription {
  id: string
  user_id: string
  plan_id: string
  start_date: string
  end_date: string
  status: 'active' | 'expired' | 'cancelled'
  razorpay_payment_id: string | null
  razorpay_order_id: string | null
  telegram_link_sent: boolean
  created_at: string
  updated_at: string
  subscription_plans?: SubscriptionPlan
}

export interface Payment {
  id: string
  user_id: string
  subscription_id: string | null
  amount_inr: number
  razorpay_payment_id: string | null
  razorpay_order_id: string | null
  razorpay_signature: string | null
  status: 'pending' | 'success' | 'failed' | 'refunded'
  payment_method: string | null
  created_at: string
  subscription_plans?: SubscriptionPlan
  user_subscriptions?: UserSubscription
}

export interface RazorpayOrderResponse {
  orderId: string
  amount: number
  currency: string
  razorpayKeyId: string
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  theme: { color: string }
  prefill: { name: string; email: string }
  handler: (response: RazorpayPaymentResponse) => void
}

export interface RazorpayInstance {
  open: () => void
  close: () => void
}
