import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Ana Səhifə',
  type: 'document',

  groups: [
    { name: 'hero',    title: 'Hero Bölməsi',    default: true },
    { name: 'logos',   title: 'Loqolar Bölməsi' },
    { name: 'features', title: 'Xüsusiyyətlər Bölməsi' },
    { name: 'seo',     title: 'SEO' },
  ],

  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: 'heroBadge',
      title: 'Hero — Nişan Mətni',
      type: 'string',
      group: 'hero',
      description: 'Başlığın üstündəki kiçik etiket. Məs: "Premium Logo Marketplace"',
      initialValue: 'Premium Logo Marketplace',
    }),
    defineField({
      name: 'heroHeadline1',
      title: 'Hero — Başlıq 1-ci sətir',
      type: 'string',
      group: 'hero',
      description: 'Məs: "Own the Logo,"',
      initialValue: 'Own the Logo,',
    }),
    defineField({
      name: 'heroHeadline2',
      title: 'Hero — Başlıq 2-ci sətir (vurğulanmış)',
      type: 'string',
      group: 'hero',
      description: 'Animasiyalı alt xətti olan sətir. Məs: "Own the Brand"',
      initialValue: 'Own the Brand',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero — Alt Başlıq',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: 'Discover thousands of professional logo designs from top designers. Find the perfect brand identity for your business.',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero — Düymə Mətni',
      type: 'string',
      group: 'hero',
      initialValue: 'Browse Logos',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero — Düymə Linki',
      type: 'string',
      group: 'hero',
      description: 'Məs: /logos və ya /#logos',
      initialValue: '/#logos',
    }),
    defineField({
      name: 'heroUserCount',
      title: 'Hero — İstifadəçi Sayı',
      type: 'number',
      group: 'hero',
      description: 'Avatarların yanında göstərilən rəqəm. Məs: 8900',
      initialValue: 8900,
    }),
    defineField({
      name: 'heroUserLabel',
      title: 'Hero — İstifadəçi Etiket Mətni',
      type: 'string',
      group: 'hero',
      description: 'Məs: "users" və ya "alıcı"',
      initialValue: 'users',
    }),

    // ── Featured Logos ─────────────────────────────────────────
    defineField({
      name: 'logosLabel',
      title: 'Loqolar — Etiket Mətni',
      type: 'string',
      group: 'logos',
      description: 'Başlığın üstündəki kiçik mətn. Məs: "Curated Collection"',
      initialValue: 'Curated Collection',
    }),
    defineField({
      name: 'logosTitle',
      title: 'Loqolar — Başlıq',
      type: 'string',
      group: 'logos',
      initialValue: 'Featured Logos',
    }),
    defineField({
      name: 'logosDescription',
      title: 'Loqolar — Təsvir',
      type: 'text',
      rows: 2,
      group: 'logos',
      initialValue: 'Handpicked by our team for exceptional design and craftsmanship.',
    }),
    defineField({
      name: 'logosCount',
      title: 'Loqolar — Neçə loqo göstərilsin',
      type: 'number',
      group: 'logos',
      description: 'Ana səhifədə neçə loqo göstəriləcəyi. Maksimum: 20',
      initialValue: 10,
      validation: (r) => r.required().min(1).max(20),
    }),
    defineField({
      name: 'logosBrowseText',
      title: 'Loqolar — "Hamısına bax" Düymə Mətni',
      type: 'string',
      group: 'logos',
      initialValue: 'Browse all logos',
    }),
    defineField({
      name: 'logosBrowseLink',
      title: 'Loqolar — "Hamısına bax" Düymə Linki',
      type: 'string',
      group: 'logos',
      initialValue: '/logos',
    }),

    defineField({
      name: 'featuredLogos',
      title: 'Loqolar — Seçilmiş Loqolar',
      type: 'array',
      group: 'logos',
      description: 'Ana səhifədə göstəriləcək loqoları əl ilə seçin. Boş qoyulsa "Öne Çıxarılmış" loqolar göstərilir.',
      of: [{ type: 'reference', to: [{ type: 'logo' }] }],
      validation: (r) => r.max(20),
    }),

    // ── Features ───────────────────────────────────────────────
    defineField({
      name: 'featuresLabel',
      title: 'Xüsusiyyətlər — Etiket Mətni',
      type: 'string',
      group: 'features',
      initialValue: 'Why LogoBuyPro',
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Xüsusiyyətlər — Başlıq',
      type: 'string',
      group: 'features',
      initialValue: 'Seamlessly Discover Your Unique Logo',
    }),
    defineField({
      name: 'featuresSubtitle',
      title: 'Xüsusiyyətlər — Alt Başlıq',
      type: 'text',
      rows: 2,
      group: 'features',
      initialValue: 'Everything you need to find, buy, and own a professional logo — all in one place.',
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Ana Səhifə' };
    },
  },
});
