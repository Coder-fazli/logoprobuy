import NavbarServer from '@/components/sections/NavbarServer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import FeaturedLogos from '@/components/sections/FeaturedLogos';
import Footer from '@/components/sections/Footer';
import { getHomePage, getFeaturedLogos } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LogoBuyPro',
  url: 'https://logobuypro.com',
  description: 'Exclusive logo marketplace — each logo sold to one buyer only. Full ownership, all source files.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://logobuypro.com/?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LogoBuyPro',
  url: 'https://logobuypro.com',
  logo: 'https://logobuypro.com/icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://logobuypro.com/contact',
  },
  sameAs: [
    'https://instagram.com/logobuypro',
    'https://twitter.com/logobuypro',
  ],
};

export default async function Home() {
  const cms = await getHomePage();

  // Use hand-picked logos from admin if set, otherwise fall back to featured flag
  const logos =
    cms?.featuredLogos?.length
      ? cms.featuredLogos
      : await getFeaturedLogos(cms?.logosCount ?? 10);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <main>
        <NavbarServer />
        <Hero cms={cms} logos={logos} />
        <Testimonials />
        <FeaturedLogos cms={cms} logos={logos} />
        <Features cms={cms} />
        <Footer />
      </main>
    </>
  );
}
