import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Privacy Policy | The Capital Guru' }

const sections = [
  { id: 'info-collect', title: 'Information We Collect', content: `<p>We collect the following information when you use our Platform:</p><ul style="list-style:disc;padding-left:20px;"><li><strong>Personal Data:</strong> Full name, email address, phone number (optional)</li><li><strong>Payment Data:</strong> Payment information processed by Razorpay (we do not store card details)</li><li><strong>Usage Data:</strong> Pages visited, features used, login timestamps, IP address</li><li><strong>Device Data:</strong> Browser type, operating system, device identifiers</li></ul>` },
  { id: 'how-use', title: 'How We Use It', content: `<p>Your information is used to:</p><ul style="list-style:disc;padding-left:20px;"><li>Create and manage your account</li><li>Process subscription payments</li><li>Deliver Telegram group access links</li><li>Send transactional emails (payment confirmations, expiry reminders)</li><li>Improve our services and user experience</li><li>Comply with legal obligations</li></ul>` },
  { id: 'data-sharing', title: 'Data Sharing', content: `<p>We share your data only with essential third-party service providers:</p><ul style="list-style:disc;padding-left:20px;"><li><strong>Supabase:</strong> Authentication and database hosting</li><li><strong>Razorpay:</strong> Payment processing</li><li><strong>Resend:</strong> Transactional email delivery</li></ul><p>We do <strong>NOT</strong> sell your personal data to third parties.</p>` },
  { id: 'cookies', title: 'Cookies', content: `<p>We use essential cookies for authentication and session management. These cookies are necessary for the Platform to function properly. We do not use advertising or tracking cookies.</p>` },
  { id: 'security', title: 'Security', content: `<p>We implement industry-standard security measures including:</p><ul style="list-style:disc;padding-left:20px;"><li>256-bit SSL encryption for all data transmission</li><li>Row Level Security (RLS) in our database</li><li>Secure authentication via Supabase Auth</li><li>PCI-compliant payment processing via Razorpay</li></ul>` },
  { id: 'rights', title: 'Your Rights', content: `<p>You have the right to:</p><ul style="list-style:disc;padding-left:20px;"><li>Access your personal data</li><li>Update or correct your information</li><li>Request deletion of your account and data</li><li>Withdraw consent for non-essential communications</li></ul><p><strong>Data Retention:</strong> We retain your data for 3 years after account deletion for legal and compliance purposes.</p>` },
  { id: 'contact', title: 'Contact', content: `<p>For privacy-related inquiries, contact us at: <a href="mailto:support@thecapitalguru.net">support@thecapitalguru.net</a></p>` },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <LegalPageLayout title="Privacy Policy" lastUpdated="January 15, 2025" sections={sections} />
      </main>
      <Footer />
    </>
  )
}
