import { defineField, defineType } from 'sanity';

export const logo = defineType({
  name: 'logo',
  title: 'Loqo',
  type: 'document',

  groups: [
    { name: 'content',  title: 'Məzmun',                    default: true },
    { name: 'details',  title: 'Təfərrüatlar' },
    { name: 'faq',      title: 'Tez-tez verilən suallar' },
    { name: 'seo',      title: 'SEO' },
  ],

  fields: [
    // ── Məzmun ────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Başlıq',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      description: 'Başlıqdan avtomatik yaradılır. Dəyişməyin.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Təsvir',
      type: 'text',
      group: 'content',
      rows: 4,
      description: 'Məhsul səhifəsində göstərilən əsas mətn.',
    }),
    defineField({
      name: 'image',
      title: 'Loqo Şəkli',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Mətn', description: 'SEO üçün şəkil təsviri.' }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Qalereya Şəkilləri',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Mətn' }),
          ],
        },
      ],
      description: 'Məhsul səhifəsindəki əlavə önizləmə şəkilləri.',
    }),
    defineField({
      name: 'category',
      title: 'Kateqoriya (Üslub)',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
      options: {
        filter: 'kind == "style"',
      },
      description: 'Loqonun üslubu: Lettermark, Mascot, Geometric…',
    }),
    defineField({
      name: 'industry',
      title: 'Sənaye',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
      options: {
        filter: 'kind == "industry"',
      },
      description: 'Hədəf sənaye: Tech, Fashion, Food…',
    }),

    // ── Təfərrüatlar ──────────────────────────────────────────
    defineField({
      name: 'price',
      title: 'Qiymət (USD)',
      type: 'number',
      group: 'details',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'buyLink',
      title: 'Satın Alma Linki',
      type: 'url',
      group: 'details',
      description: 'Ödəniş linki (məs. Stripe, Gumroad). "Satın Al" düyməsi bura yönlənəcək.',
    }),
    defineField({
      name: 'sold',
      title: 'Satılıb',
      type: 'boolean',
      group: 'details',
      description: 'Satılıb kimi işarələyin — "Satılıb" nişanı göstərilir və düymə deaktiv olur.',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıxarılmış',
      type: 'boolean',
      group: 'details',
      description: 'Ana səhifədəki "Seçilmiş Loqolar" bölməsində göstər.',
      initialValue: false,
    }),
    defineField({
      name: 'designer',
      title: 'Dizayner Adı',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'filesIncluded',
      title: 'Daxil Olan Fayllar',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: { list: ['AI', 'EPS', 'SVG', 'PNG', 'PDF'] },
    }),

    // ── TVS ───────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'TVS Bölmələri',
      type: 'array',
      group: 'faq',
      description: 'Boş qoyulsa standart TVS göstərilir.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', type: 'string', title: 'Sual' }),
            defineField({ name: 'answer', type: 'text', title: 'Cavab', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
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
    select: {
      title: 'title',
      media: 'image',
      price: 'price',
      sold: 'sold',
    },
    prepare({ title, media, price, sold }) {
      return {
        title,
        subtitle: sold ? '— Satılıb' : price ? `$${price}` : 'Qiymət yoxdur',
        media,
      };
    },
  },
});
