import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'SEBI & Investment Disclaimer | The Capital Guru' }

const sections = [
  { id: 'not-sebi', title: 'Not SEBI Registered', content: `<p><strong>The Capital Guru is NOT registered with the Securities and Exchange Board of India (SEBI) as an Investment Advisor.</strong></p><p>We do not hold any SEBI registration for providing investment advisory services. Our platform operates as an educational and informational resource for stock market enthusiasts.</p>` },
  { id: 'educational', title: 'Educational Purpose Only', content: `<p><strong>All market signals, calls, and content published on this platform and in our Telegram groups are strictly for EDUCATIONAL and INFORMATIONAL purposes only.</strong></p><p>They do <strong>NOT</strong> constitute investment advice, financial advice, or recommendations to buy or sell securities.</p><p>The content shared should be viewed as educational material to help you understand market dynamics, not as personalized investment guidance.</p>` },
  { id: 'no-liability', title: 'No Liability', content: `<p><strong>The Capital Guru, its founders, employees, and affiliates shall NOT be held responsible or liable for any financial losses, damages, or consequences arising from the use of our content.</strong></p><p>Trading decisions are made solely at the discretion of the user. We expressly disclaim all liability for any direct, indirect, incidental, or consequential damages resulting from the use of our services.</p>` },
  { id: 'market-risk', title: 'Market Risk Warning', content: `<p><strong>Stock market investments are subject to market risks.</strong></p><p>The value of investments can go down as well as up. Past performance of signals does <strong>NOT</strong> guarantee future results. Any statistics, win rates, or profit figures shared on our platform are historical data and should not be construed as a guarantee of future performance.</p>` },
  { id: 'user-responsibility', title: 'User Responsibility', content: `<p>Users must:</p><ul style="list-style:disc;padding-left:20px;"><li>Conduct their own research and due diligence before making any investment decisions</li><li>Consult a <strong>SEBI-registered financial advisor</strong> before making any investment decisions</li><li>Only invest money they can afford to lose</li><li>Understand the risks associated with stock market trading</li></ul><p><strong>By subscribing and accessing our content, you confirm that you understand and accept these terms fully.</strong></p>` },
]

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        {/* Warning banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
          <div className="bg-primary-container/10 border border-primary/20 rounded-xl p-5 text-center mb-6">
            <p className="text-on-surface text-sm font-body font-medium">
              ⚠️ Please read this disclaimer carefully before using our services.
            </p>
          </div>
        </div>
        <LegalPageLayout title="SEBI & Investment Disclaimer" lastUpdated="January 15, 2025" sections={sections} />
      </main>
      <Footer />
    </>
  )
}
