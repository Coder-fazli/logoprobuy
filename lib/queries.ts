import { client } from './sanity';

export interface SanityLogo {
  _id: string;
  title: string;
  slug: { current: string };
  image: { asset: { url: string }; alt?: string };
  gallery?: { asset: { url: string }; alt?: string }[];
  price: number;
  description?: string;
  designer?: string;
  filesIncluded?: string[];
  buyLink?: string;
  sold?: boolean;
  category?: { title: string; slug: { current: string } };
  industry?: { title: string; slug: { current: string } };
  tags?: string[];
  faq?: { question: string; answer: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { url: string } };
    noIndex?: boolean;
    canonicalUrl?: string;
    keywords?: string[];
  };
}

const LOGO_FIELDS = `
  _id,
  title,
  slug,
  image { asset->{ url }, alt },
  gallery[] { asset->{ url }, alt },
  price,
  description,
  designer,
  filesIncluded,
  buyLink,
  sold,
  category->{ title, slug },
  industry->{ title, slug },
  tags,
  faq[] { question, answer },
  seo {
    metaTitle,
    metaDescription,
    ogImage { asset->{ url } },
    noIndex,
    canonicalUrl,
    keywords
  }
`;

export async function getLogoBySlug(slug: string): Promise<SanityLogo | null> {
  return client.fetch(
    `*[_type == "logo" && slug.current == $slug][0] { ${LOGO_FIELDS} }`,
    { slug }
  );
}

export async function getAllLogoSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "logo"] { "slug": slug.current }`);
}

export async function getFeaturedLogos(count = 10): Promise<SanityLogo[]> {
  return client.fetch(
    `*[_type == "logo" && featured == true] | order(_createdAt desc)[0...$count] { ${LOGO_FIELDS} }`,
    { count }
  );
}

export interface HomePageData {
  heroBadge?: string;
  heroHeadline1?: string;
  heroHeadline2?: string;
  heroSubheadline?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  heroUserCount?: number;
  heroUserLabel?: string;
  logosLabel?: string;
  logosTitle?: string;
  logosDescription?: string;
  logosCount?: number;
  logosBrowseText?: string;
  logosBrowseLink?: string;
  featuresLabel?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { url: string } };
    noIndex?: boolean;
    canonicalUrl?: string;
    keywords?: string[];
  };
}

export interface AboutPageData {
  heroHeadline?: string;
  heroBio?: any[];
  heroPhoto?: { asset: { url: string }; alt?: string };
  advantagesLabel?: string;
  advantagesImage?: { asset: { url: string }; alt?: string };
  advantages?: { title: string; description: string }[];
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  dribbble?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { url: string } };
    noIndex?: boolean;
    canonicalUrl?: string;
  };
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  return client.fetch(
    `*[_type == "aboutPage" && _id == "aboutPage"][0] {
      heroHeadline,
      heroBio,
      heroPhoto { asset->{ url }, alt },
      advantagesLabel,
      advantagesImage { asset->{ url }, alt },
      advantages[] { title, description },
      instagram, twitter, linkedin, youtube, dribbble,
      seo { metaTitle, metaDescription, ogImage { asset->{ url } }, noIndex, canonicalUrl }
    }`
  );
}

export interface ContactPageData {
  headline?: string;
  email?: string;
  replyTime?: string;
  seo?: { metaTitle?: string; metaDescription?: string; noIndex?: boolean; canonicalUrl?: string };
}

export async function getContactPage(): Promise<ContactPageData | null> {
  return client.fetch(
    `*[_type == "contactPage" && _id == "contactPage"][0] {
      headline, email, replyTime,
      seo { metaTitle, metaDescription, noIndex, canonicalUrl }
    }`
  );
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description, kind }`
  );
}

export async function getIndustries(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category" && kind == "industry"] | order(title asc) { _id, title, slug, description }`
  );
}

export async function getStyles(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category" && kind == "style"] | order(title asc) { _id, title, slug, description }`
  );
}

export async function getAllLogos(): Promise<SanityLogo[]> {
  return client.fetch(
    `*[_type == "logo"] | order(_createdAt desc) { ${LOGO_FIELDS} }`
  );
}

export async function getHomePage(): Promise<HomePageData & { featuredLogos?: SanityLogo[] } | null> {
  return client.fetch(
    `*[_type == "homePage" && _id == "homePage"][0] {
      heroBadge, heroHeadline1, heroHeadline2, heroSubheadline,
      heroCtaText, heroCtaLink, heroUserCount, heroUserLabel,
      logosLabel, logosTitle, logosDescription, logosCount,
      logosBrowseText, logosBrowseLink,
      featuresLabel, featuresTitle, featuresSubtitle,
      "featuredLogos": featuredLogos[]->{ ${LOGO_FIELDS} },
      seo { metaTitle, metaDescription, ogImage { asset->{ url } }, noIndex, canonicalUrl, keywords }
    }`
  );
}
