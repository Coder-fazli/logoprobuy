import { Metadata } from 'next';
import NavbarServer from '@/components/sections/NavbarServer';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — LogoBuyPro',
  description: 'How LogoBuyPro collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarServer />
      <main className="flex-1 pt-28 pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: April 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-gray-700">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>When you use LogoBuyPro, we may collect the following types of information:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Contact information</strong> — name and email address when you reach out to us.</li>
                <li><strong>Purchase data</strong> — transaction details processed through our third-party payment provider.</li>
                <li><strong>Usage data</strong> — pages visited, time spent, and interactions collected via analytics tools.</li>
                <li><strong>Cookies</strong> — small files stored in your browser to improve your browsing experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Process and deliver your logo purchases.</li>
                <li>Respond to your inquiries and support requests.</li>
                <li>Send order confirmations and important account updates.</li>
                <li>Improve the website, content, and user experience.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Sharing Your Information</h2>
              <p>We do not sell, rent, or trade your personal information. We may share data with trusted third parties only as necessary to operate the service — for example, payment processors (Stripe) and analytics providers — all of whom are bound by their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
              <p>We use cookies to remember your preferences and analyse site traffic. You can disable cookies in your browser settings at any time, though some features of the site may not function correctly without them.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
              <p>We retain your personal data only for as long as necessary to fulfil the purposes described in this policy, or as required by law. Purchase records are kept for accounting and tax purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at{' '}
                <a href="mailto:jeyhunmd111@gmail.com" className="text-gray-900 underline underline-offset-2">jeyhunmd111@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Security</h2>
              <p>We take reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised date. Continued use of LogoBuyPro after changes constitutes acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
              <p>Questions about this policy? Email us at{' '}
                <a href="mailto:jeyhunmd111@gmail.com" className="text-gray-900 underline underline-offset-2">jeyhunmd111@gmail.com</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
