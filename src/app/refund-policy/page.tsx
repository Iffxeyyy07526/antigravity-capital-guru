import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Refund Policy | The Capital Guru' }

const sections = [
  { id: 'refund-policy', title: 'Refund Policy', content: `<p><strong>All subscription purchases are FINAL and NON-REFUNDABLE. By purchasing, you agree to these terms.</strong></p><p>Since our service provides immediate access to a private Telegram group with real-time signals, refunds are generally not offered once access has been granted.</p>` },
  { id: 'exceptions', title: 'Exceptions', content: `<p>Refunds are only processed in the following exceptional case:</p><p><strong>If your Telegram group invite link was NOT delivered within 24 hours of confirmed payment, you are eligible for a full refund.</strong></p>` },
  { id: 'dispute-process', title: 'Dispute Process', content: `<p>To request a refund under the eligible exception:</p><ol style="list-style:decimal;padding-left:20px;"><li>Email <a href="mailto:support@thecapitalguru.net">support@thecapitalguru.net</a> within <strong>48 hours</strong> of purchase</li><li>Include your <strong>Razorpay Payment ID</strong> and registered email address</li><li>Our team will respond within <strong>24-48 business hours</strong></li><li>Approved refunds are processed via Razorpay to your original payment method within <strong>5-7 business days</strong></li></ol>` },
  { id: 'no-refunds', title: 'No Refunds For', content: `<p>Refunds will <strong>NOT</strong> be granted for:</p><ul style="list-style:disc;padding-left:20px;"><li>Change of mind after purchase</li><li>Partial usage of subscription period</li><li>Performance or accuracy of trading signals (these are educational and for informational purposes only)</li><li>Technical issues on the user's device (internet connectivity, Telegram app issues, etc.)</li><li>Failure to use the service during the subscription period</li></ul>` },
]

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <LegalPageLayout title="Refund Policy" lastUpdated="January 15, 2025" sections={sections} />
      </main>
      <Footer />
    </>
  )
}
