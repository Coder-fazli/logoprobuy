import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import FeaturedLogos from '@/components/sections/FeaturedLogos';
import Footer from '@/components/sections/Footer';
import { getHomePage, getFeaturedLogos } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const cms = await getHomePage();

  // Use hand-picked logos from admin if set, otherwise fall back to featured flag
  const logos =
    cms?.featuredLogos?.length
      ? cms.featuredLogos
      : await getFeaturedLogos(cms?.logosCount ?? 10);

  return (
    <main>
      <Navbar />
      <Hero cms={cms} />
      <Testimonials />
      <FeaturedLogos cms={cms} logos={logos} />
      <Features cms={cms} />
      <Footer />
    </main>
  );
}
