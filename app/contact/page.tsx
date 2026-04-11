import { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { getContactPage } from '@/lib/queries';
import ContactClient from './ContactClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();
  const title = data?.seo?.metaTitle ?? 'Contact — LogoBuyPro';
  const description =
    data?.seo?.metaDescription ??
    'Get in touch with LogoBuyPro. We reply within 1–8 hours.';
  return {
    title,
    description,
    openGraph: { title, description },
    robots: data?.seo?.noIndex ? 'noindex,nofollow' : 'index,follow',
    ...(data?.seo?.canonicalUrl && { alternates: { canonical: data.seo.canonicalUrl } }),
  };
}

export default async function ContactPage() {
  const data = await getContactPage();

  const headline  = data?.headline  ?? "Let's work together!";
  const email     = data?.email     ?? 'hello@logobuypro.com';
  const replyTime = data?.replyTime ?? 'Get a reply to you within 1 - 8 hrs';

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex flex-col">
      <Navbar />
      <ContactClient headline={headline} email={email} replyTime={replyTime} />
      <Footer />
    </div>
  );
}
