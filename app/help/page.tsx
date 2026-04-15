import { Metadata } from 'next';
import NavbarServer from '@/components/sections/NavbarServer';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Help Center — LogoBuyPro',
  description: 'Answers to the most common questions about buying logos on LogoBuyPro.',
};

const faqs = [
  {
    q: 'How does LogoBuyPro work?',
    a: 'LogoBuyPro is a marketplace for exclusive, ready-made logo designs. Each logo is sold only once — when you purchase it, the listing is permanently removed so no other business can own the same design.',
  },
  {
    q: 'What files will I receive after purchase?',
    a: 'You will receive the files listed on the logo page, which typically include AI, EPS, SVG, PNG (transparent background), and PDF. All files are sent to your email within minutes of purchase.',
  },
  {
    q: 'Can I customise the logo after buying it?',
    a: 'Yes. You receive the full source files and are free to modify, adapt, or extend the design with any designer you choose.',
  },
  {
    q: 'Is the logo truly exclusive?',
    a: 'Yes. The moment your payment is confirmed the listing is taken down and marked as sold. The design will never be sold to anyone else.',
  },
  {
    q: 'Can I trademark my purchased logo?',
    a: 'You can apply to register the logo as a trademark. We recommend consulting a trademark attorney in your jurisdiction, as approval depends on factors beyond the design itself.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit and debit cards via our secure payment provider. The exact options are shown at checkout.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Because all logos are exclusive digital products and files are delivered immediately upon purchase, all sales are final. If you experience a technical issue please contact us within 7 days and we will resolve it.',
  },
  {
    q: 'I have a specific brief — can you design a custom logo?',
    a: 'Yes! Reach out via our Contact page and describe your project. We offer custom logo design services tailored to your brand.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email us at jeyhunmd111@gmail.com. We typically reply within 1–8 hours on business days.',
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarServer />
      <main className="flex-1 pt-28 pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">

          <h1 className="text-4xl font-bold tracking-tight mb-2">Help Center</h1>
          <p className="text-muted-foreground mb-12 text-lg">Answers to the most common questions.</p>

          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-8 last:border-0">
                <h2 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h2>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {faq.a.includes('jeyhunmd111@gmail.com') ? (
                    <>
                      {faq.a.replace('jeyhunmd111@gmail.com', '')}
                      <a href="mailto:jeyhunmd111@gmail.com" className="text-gray-900 underline underline-offset-2">
                        jeyhunmd111@gmail.com
                      </a>
                      . We typically reply within 1–8 hours on business days.
                    </>
                  ) : faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
            <p className="font-semibold text-gray-900 mb-1">Still have a question?</p>
            <p className="text-sm text-muted-foreground mb-4">We're happy to help — just send us an email.</p>
            <a
              href="mailto:jeyhunmd111@gmail.com"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              jeyhunmd111@gmail.com
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
