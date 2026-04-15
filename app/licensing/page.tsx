import { Metadata } from 'next';
import NavbarServer from '@/components/sections/NavbarServer';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Licensing — LogoBuyPro',
  description: 'Understand what you can and cannot do with a logo purchased from LogoBuyPro.',
};

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarServer />
      <main className="flex-1 pt-28 pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Licensing</h1>
          <p className="text-sm text-muted-foreground mb-10">What you get when you buy a logo</p>

          <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-gray-700">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Exclusive Commercial Licence</h2>
              <p>Every logo sold on LogoBuyPro comes with a <strong>perpetual, worldwide, exclusive commercial licence</strong>. Once you purchase, the listing is removed from sale permanently — you are the only person who can use that design.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What You Can Do</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the logo as your official business identity across all media — print, digital, signage, packaging, merchandise, social media.</li>
                <li>Modify, adapt, or extend the design to suit your brand (with any designer).</li>
                <li>Register the logo as a trademark (we recommend consulting a trademark attorney first).</li>
                <li>Use the logo for commercial projects, clients, and campaigns without royalties.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What You Cannot Do</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Resell, lease, or sublicence the logo files to another person or business.</li>
                <li>Claim you personally created the original artwork.</li>
                <li>Use the logo in any way that promotes illegal, hateful, or harmful activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Files Included</h2>
              <p>Depending on the listing, you will receive some or all of the following:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>AI</strong> — Adobe Illustrator source file (fully editable vectors)</li>
                <li><strong>EPS</strong> — vector format compatible with most design software</li>
                <li><strong>SVG</strong> — scalable vector for web and digital use</li>
                <li><strong>PNG</strong> — high-resolution raster with transparent background</li>
                <li><strong>PDF</strong> — print-ready vector document</li>
              </ul>
              <p className="mt-3">The exact files included are listed on each individual logo page.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Ownership vs. Copyright</h2>
              <p>You receive an exclusive commercial licence, not a copyright transfer. The original designer retains moral rights to the artwork. In practice, this means you can use the logo freely for your business in perpetuity, but the designer may still list it in their portfolio as a past work.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Questions?</h2>
              <p>If you have specific licensing questions, email us at{' '}
                <a href="mailto:jeyhunmd111@gmail.com" className="text-gray-900 underline underline-offset-2">jeyhunmd111@gmail.com</a> and we'll be happy to help.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
