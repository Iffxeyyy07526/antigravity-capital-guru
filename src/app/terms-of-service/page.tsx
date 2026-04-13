import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Terms of Service | The Capital Guru' }

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms', content: `<p>By accessing or using <strong>thecapitalguru.net</strong> ("Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>` },
  { id: 'services', title: 'Services', content: `<p>The Capital Guru provides stock market signal delivery via Telegram groups, market analysis content, and educational resources. Our signals cover NSE and BSE listed securities including equity and derivatives segments.</p>` },
  { id: 'accounts', title: 'User Accounts', content: `<p>You must register for an account to access paid features. You are responsible for maintaining the confidentiality of your credentials. You must provide accurate, current, and complete information during registration.</p><p>The Capital Guru reserves the right to suspend or terminate accounts that violate these terms or are suspected of fraudulent activity.</p>` },
  { id: 'subscriptions', title: 'Subscription & Payments', content: `<p>Subscriptions are available in monthly, 6-month, and annual plans. All payments are processed securely through <strong>Razorpay</strong>.</p><p>Subscriptions <strong>do not auto-renew</strong>. After your subscription period ends, access to the Telegram group will be revoked unless you renew manually.</p><p>All prices are listed in Indian Rupees (INR) and are inclusive of platform fees. GST (18%) is applied at checkout.</p>` },
  { id: 'ip', title: 'Intellectual Property', content: `<p>All content on the Platform — including signals, analysis, text, graphics, logos, and code — is the property of The Capital Guru. You may not reproduce, distribute, or share our signals or Telegram group content without written permission.</p>` },
  { id: 'prohibited', title: 'Prohibited Activities', content: `<p>You agree not to:</p><ul style="list-style:disc;padding-left:20px;"><li>Share Telegram group invite links with non-subscribers</li><li>Redistribute, resell, or screenshot signals for public sharing</li><li>Attempt to gain unauthorized access to the Platform</li><li>Use the Platform for any illegal purpose</li><li>Create multiple accounts to abuse referral or trial systems</li></ul>` },
  { id: 'termination', title: 'Termination', content: `<p>The Capital Guru may terminate or suspend your account at any time for violations of these terms. Upon termination, your access to Telegram groups and all paid features will be revoked immediately.</p>` },
  { id: 'governing-law', title: 'Governing Law', content: `<p>These Terms are governed by the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p><p>For dispute resolution, contact: <a href="mailto:support@thecapitalguru.net">support@thecapitalguru.net</a></p>` },
]

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <LegalPageLayout title="Terms of Service" lastUpdated="January 15, 2025" sections={sections} />
      </main>
      <Footer />
    </>
  )
}
