import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Parametrlər',
  type: 'document',
  fields: [
    // ── Logo ─────────────────────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Sayt Loqosu',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Mətn' }),
      ],
    }),
    defineField({
      name: 'logoWidth',
      title: 'Loqo Eni (px)',
      type: 'number',
      initialValue: 140,
      validation: (r) => r.min(20).max(600),
    }),
    defineField({
      name: 'logoHeight',
      title: 'Loqo Hündürlüyü (px)',
      type: 'number',
      initialValue: 40,
      validation: (r) => r.min(10).max(300),
    }),

    // ── Favicon ───────────────────────────────────────────────────
    defineField({
      name: 'favicon',
      title: 'Favicon (İkon)',
      type: 'image',
      description: 'Brauzer tabında görünən kiçik ikon. Yükləndikdən sonra kəsmə/fokuslama üçün şəkli redaktə edin.',
      options: { hotspot: true },
    }),

    // ── Social links ──────────────────────────────────────────────
    defineField({ name: 'twitter',   title: 'Twitter / X URL',  type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram URL',    type: 'url' }),
    defineField({ name: 'linkedin',  title: 'LinkedIn URL',     type: 'url' }),
    defineField({ name: 'youtube',   title: 'YouTube URL',      type: 'url' }),
  ],

  preview: {
    prepare() {
      return { title: 'Parametrlər' };
    },
  },
});
