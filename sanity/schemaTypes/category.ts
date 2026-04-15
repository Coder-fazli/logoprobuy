import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Kateqoriya',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Növ',
      type: 'string',
      options: {
        list: [
          { title: 'Industry (sənaye)', value: 'industry' },
          { title: 'Style (üslub)', value: 'style' },
        ],
        layout: 'radio',
      },
      initialValue: 'style',
      validation: (r) => r.required(),
    }),
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

  preview: {
    select: { title: 'title', kind: 'kind' },
    prepare({ title, kind }) {
      return {
        title,
        subtitle: kind === 'industry' ? 'Industry' : 'Style',
      };
    },
  },
});
