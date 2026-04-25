import { Suspense } from 'react';
import NavbarServer from '@/components/sections/NavbarServer';
import Footer from '@/components/sections/Footer';
import ShopGrid from '@/components/sections/ShopGrid';
import { getAllLogos, getIndustries, getStyles } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Browse Logos — LogoBuyPro',
  description: 'Explore our curated collection of exclusive, ready-to-buy logo designs across every industry.',
};

export default async function LogosPage() {
  const [logos, industries, styles] = await Promise.all([
    getAllLogos(),
    getIndustries(),
    getStyles(),
  ]);

  return (
    <>
      <NavbarServer />

      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Page header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-foreground/30 rounded-full" />
              <p className="text-sm font-semibold uppercase tracking-widest text-foreground/50">
                Marketplace
              </p>
              <span className="h-px w-6 bg-foreground/30 rounded-full" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Browse{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Logos</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D33C3C]/30 rounded-sm -z-0" />
              </span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Handcrafted exclusive logos ready to own. Each design sold only once — first come, first served.
            </p>
          </div>

          <Suspense fallback={<div className="py-24 text-center text-muted-foreground text-sm">Loading…</div>}>
            <ShopGrid logos={logos} industries={industries} styles={styles} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
