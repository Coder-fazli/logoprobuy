import { Metadata } from 'next';
import Image from 'next/image';
import NavbarServer from '@/components/sections/NavbarServer';
import Footer from '@/components/sections/Footer';
import SocialSidebar from '@/components/ui/SocialSidebar';
import SocialRow from '@/components/ui/SocialRow';
import { getAboutPage } from '@/lib/queries';
import { PortableText } from '@portabletext/react';

export const dynamic = 'force-dynamic';

const DEFAULT_ADVANTAGES = [
  {
    title: 'one-man studio',
    description:
      'Cooperate directly with an experienced individual designer instead of a manager who may delegate your project to a newbie designer at large advertising or branding agencies.',
  },
  {
    title: 'attention to details',
    description:
      'I often use grids, basic geometric shapes and principles of the golden ratio to perfect logos both visually and technically.',
  },
  {
    title: 'reliability',
    description:
      "I never run more than 2 projects at the same time, that means you don't need to wait for months for the result. I always set a reasonable deadline.",
  },
  {
    title: 'full ownership',
    description:
      'Once purchased, the logo is permanently removed from sale. You receive 100% ownership and all associated source files.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  const title = data?.seo?.metaTitle ?? 'About — LogoBuyPro';
  const description =
    data?.seo?.metaDescription ??
    'Learn about the designer behind LogoBuyPro — crafting exclusive, trademark-ready logos for brands worldwide.';
  return {
    title,
    description,
    openGraph: { title, description },
    robots: data?.seo?.noIndex ? 'noindex,nofollow' : 'index,follow',
    ...(data?.seo?.canonicalUrl && { alternates: { canonical: data.seo.canonicalUrl } }),
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();

  const headline  = data?.heroHeadline ?? 'Hello, I am the designer\nbehind LogoBuyPro';
  const photoUrl  = data?.heroPhoto?.asset.url ?? '/about-photo.jpg';
  const photoAlt  = data?.heroPhoto?.alt ?? 'Designer photo';
  const advLabel  = data?.advantagesLabel ?? 'advantages of cooperating with me';
  const advImage  = data?.advantagesImage?.asset.url ?? null;
  const advantages = data?.advantages?.length ? data.advantages : DEFAULT_ADVANTAGES;

  const socialProps = {
    instagram: data?.instagram,
    twitter:   data?.twitter,
    linkedin:  data?.linkedin,
    youtube:   data?.youtube,
    dribbble:  data?.dribbble,
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarServer />

      {/* Desktop vertical sidebar */}
      <SocialSidebar {...socialProps} />

      {/* ── Section 1: About ──────────────────────────────── */}
      <section className="container mx-auto px-6 lg:px-16 pt-24 lg:pt-32 pb-12 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Mobile: photo first, then text */}
          <div className="flex justify-center lg:hidden">
            {photoUrl ? (
              <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={photoUrl} alt={photoAlt} fill className="object-cover" priority />
              </div>
            ) : (
              <div className="w-full max-w-xs aspect-[3/4] rounded-2xl bg-neutral-100 flex items-center justify-center text-muted-foreground text-sm">
                Şəkil əlavə edin
              </div>
            )}
          </div>

          {/* Left — text */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground whitespace-pre-line">
              {headline}
            </h1>

            {data?.heroBio?.length ? (
              <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed prose prose-neutral max-w-none">
                <PortableText value={data.heroBio} />
              </div>
            ) : (
              <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>An independent graphic designer specializing in logo and brand identity design, focusing on creating simple and clean solutions.</p>
                <p>With years of professional experience, I have completed hundreds of projects and have worked with clients worldwide.</p>
                <p>I always aim to exceed my client's expectations with every new project. Let's work together to create something iconic for you.</p>
              </div>
            )}

            {/* Mobile social row — shown below bio */}
            <div className="mt-8 lg:hidden">
              <SocialRow {...socialProps} />
            </div>
          </div>

          {/* Right — photo (desktop only) */}
          <div className="hidden lg:flex justify-end">
            {photoUrl ? (
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={photoUrl} alt={photoAlt} fill className="object-cover" priority />
              </div>
            ) : (
              <div className="w-full max-w-sm aspect-[3/4] rounded-2xl bg-neutral-100 flex items-center justify-center text-muted-foreground text-sm">
                Şəkil əlavə edin
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 2: Advantages ─────────────────────────── */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — image (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              {advImage ? (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                  <Image src={advImage} alt="Advantages" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full aspect-square rounded-2xl bg-neutral-50" />
              )}
            </div>

            {/* Right — advantages list */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
                {advLabel}
              </p>

              <div className="space-y-8">
                {advantages.map((item, i) => (
                  <div key={i} className="border-t border-border pt-6">
                    <h3 className="text-lg lg:text-xl font-bold text-foreground tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
