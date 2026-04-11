import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Kateqoriya',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlıq',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Təsvir',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'İkon',
      type: 'image',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
});
