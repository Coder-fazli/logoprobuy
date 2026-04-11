import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Haqqımda Səhifəsi',
  type: 'document',

  groups: [
    { name: 'hero',       title: 'Haqqımda Bölməsi', default: true },
    { name: 'advantages', title: 'Üstünlüklər Bölməsi' },
    { name: 'social',     title: 'Sosial Şəbəkələr' },
    { name: 'seo',        title: 'SEO' },
  ],

  fields: [
    // ── About / Hero ──────────────────────────────────────────
    defineField({
      name: 'heroHeadline',
      title: 'Baş Başlıq',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Məs: "Hello, my name is Bohdan and I am the designer behind LogoBuyPro"',
      initialValue: 'Hello, my name is [Name]\nand I am the designer behind LogoBuyPro',
    }),
    defineField({
      name: 'heroBio',
      title: 'Bio / Haqqında Mətn',
      type: 'array',
      group: 'hero',
      of: [{ type: 'block' }],
      description: 'Birneçə abzas daxil edə bilərsiniz.',
    }),
    defineField({
      name: 'heroPhoto',
      title: 'Foto',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Mətn' }),
      ],
    }),

    // ── Advantages ────────────────────────────────────────────
    defineField({
      name: 'advantagesLabel',
      title: 'Üstünlüklər — Etiket Mətni',
      type: 'string',
      group: 'advantages',
      initialValue: 'advantages of cooperating with me',
    }),
    defineField({
      name: 'advantagesImage',
      title: 'Üstünlüklər — Sol Şəkil',
      type: 'image',
      group: 'advantages',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Mətn' }),
      ],
    }),
    defineField({
      name: 'advantages',
      title: 'Üstünlüklər Siyahısı',
      type: 'array',
      group: 'advantages',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Başlıq' }),
            defineField({ name: 'description', type: 'text', title: 'Təsvir', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── Social ────────────────────────────────────────────────
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter) URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'dribbble',
      title: 'Dribbble URL',
      type: 'url',
      group: 'social',
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
      return { title: 'Haqqımda Səhifəsi' };
    },
  },
});
