-- ① PROFILES (extends Supabase auth.users)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   VARCHAR(255),
  phone       VARCHAR(20),
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW(),
  status      TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted'))
);

-- ② SUBSCRIPTION PLANS
CREATE TABLE subscription_plans (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               VARCHAR(100) NOT NULL,
  duration_months    INTEGER NOT NULL,
  price_inr          DECIMAL(10,2) NOT NULL,
  original_price_inr DECIMAL(10,2),
  telegram_group_link VARCHAR(500) NOT NULL DEFAULT '',
  features           JSONB,
  badge_text         VARCHAR(50),
  is_popular         BOOLEAN DEFAULT FALSE,
  is_active          BOOLEAN DEFAULT TRUE,
  created_at         TIMESTAMP DEFAULT NOW()
);

-- Seed plans
INSERT INTO subscription_plans
  (name, duration_months, price_inr, original_price_inr, telegram_group_link, badge_text, is_popular, features)
VALUES
  ('Starter', 1,  2499.00,  NULL,      'https://t.me/+YOUR_STARTER_LINK', NULL,          FALSE,
   '["Daily market signals","Telegram group access","Email support"]'),
  ('Pro',     6,  11999.00, 14994.00, 'https://t.me/+YOUR_PRO_LINK', 'SAVE 20%', TRUE,
   '["Daily market signals","Telegram group access","Priority support","Intraday alerts","Option chain analysis"]'),
  ('Elite',   12, 19999.00, 29988.00, 'https://t.me/+YOUR_ELITE_LINK', 'BEST VALUE', FALSE,
   '["Daily market signals","Telegram group access","24/7 VIP support","Intraday alerts","Option chain analysis","1-on-1 consultation (monthly)","Portfolio review"]');

-- ③ USER SUBSCRIPTIONS
CREATE TABLE user_subscriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id             UUID REFERENCES subscription_plans(id),
  start_date          TIMESTAMP NOT NULL,
  end_date            TIMESTAMP NOT NULL,
  status              TEXT DEFAULT 'active' CHECK (status IN ('active','expired','cancelled')),
  razorpay_payment_id VARCHAR(255),
  razorpay_order_id   VARCHAR(255),
  telegram_link_sent  BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW()
);

-- ④ PAYMENTS
CREATE TABLE payments (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subscription_id      UUID REFERENCES user_subscriptions(id),
  amount_inr           DECIMAL(10,2) NOT NULL,
  razorpay_payment_id  VARCHAR(255) UNIQUE,
  razorpay_order_id    VARCHAR(255),
  razorpay_signature   VARCHAR(500),
  status               TEXT DEFAULT 'pending' CHECK (status IN ('pending','success','failed','refunded')),
  payment_method       VARCHAR(50),
  created_at           TIMESTAMP DEFAULT NOW()
);

-- ⑤ INDEXES
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status  ON user_subscriptions(status);
CREATE INDEX idx_payments_razorpay_payment_id ON payments(razorpay_payment_id);

-- ⑥ ROW LEVEL SECURITY
ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;

-- Subscription plans are public (read-only)
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active plans"
  ON subscription_plans FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions"
  ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT USING (auth.uid() = user_id);

-- ⑦ AUTO-CREATE PROFILE ON SIGNUP (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
