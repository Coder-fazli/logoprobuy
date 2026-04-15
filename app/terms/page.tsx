import { Metadata } from 'next';
import NavbarServer from '@/components/sections/NavbarServer';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — LogoBuyPro',
  description: 'Read the terms and conditions governing the use of LogoBuyPro.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarServer />
      <main className="flex-1 pt-28 pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: April 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-gray-700">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using LogoBuyPro, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. What You're Buying</h2>
              <p>Each logo listed on LogoBuyPro is an exclusive, one-time-sale design. When you purchase a logo:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>You receive full commercial rights to use the logo for your business.</li>
                <li>The listing is permanently removed from the marketplace — no one else can purchase it.</li>
                <li>You receive all source files stated in the listing (AI, EPS, SVG, PNG, PDF).</li>
                <li>You do <strong>not</strong> receive the original designer's copyright — you receive a perpetual, exclusive commercial licence.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Prohibited Uses</h2>
              <p>You may not:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Resell, redistribute, or sublicence the logo files to third parties.</li>
                <li>Use the logo in any unlawful, defamatory, or offensive manner.</li>
                <li>Claim original authorship or register the design as a trademark without independent legal advice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Refund Policy</h2>
              <p>Due to the exclusive and digital nature of our products, all sales are final. We do not offer refunds once files have been delivered. If you experience a technical issue with your purchase, contact us within 7 days at{' '}
                <a href="mailto:jeyhunmd111@gmail.com" className="text-gray-900 underline underline-offset-2">jeyhunmd111@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
              <p>All logos displayed on LogoBuyPro are the original work of their respective designers. Until purchased, all rights remain with LogoBuyPro and its designers. Unauthorised reproduction of any listing is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Disclaimer of Warranties</h2>
              <p>LogoBuyPro is provided "as is" without warranties of any kind. We do not guarantee that the site will be uninterrupted, error-free, or free of viruses.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, LogoBuyPro shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site or purchase of a logo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
              <p>Questions about these terms? Email us at{' '}
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
