import Link from 'next/link'
import Logo from './Logo'

const footerLinks = {
  product: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-surface-dim border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="default" />
            <p className="mt-4 text-on-surface/55 text-sm leading-relaxed max-w-sm font-body">
              Trade with precision. Profit with confidence.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:support@thecapitalguru.net"
                className="text-primary text-sm font-medium hover:underline"
              >
                support@thecapitalguru.net
              </a>
              <a
                href="https://t.me/thecapitalguru_support"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit bg-primary/10 border border-primary/30 text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                💬 Chat on Telegram
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-on-surface text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface/50 hover:text-on-surface text-sm transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-on-surface text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface/50 hover:text-on-surface text-sm transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/[0.06] text-center">
          <p className="text-on-surface/[0.35] text-xs font-body">
            © 2025 The Capital Guru. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
