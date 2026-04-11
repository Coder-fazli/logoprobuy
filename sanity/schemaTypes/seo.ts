import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Başlıq',
      type: 'string',
      description: 'İdeal uzunluq: 50–60 simvol.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Təsvir',
      type: 'text',
      rows: 3,
      description: 'İdeal uzunluq: 150–160 simvol.',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Sosial Media Şəkli (OG)',
      type: 'image',
      description: 'Tövsiyə olunan ölçü: 1200×630px. Sosial paylaşım önizləməsi üçün.',
    }),
    defineField({
      name: 'noIndex',
      title: 'İndeksləməni Bağla',
      type: 'boolean',
      description: 'Axtarış motorlarının bu səhifəni indeksləməsinin qarşısını al.',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Kanonik URL',
      type: 'url',
      description: 'Kanonik URL-i dəyişdirin (boş qoyulsa səhifənin URL-i istifadə olunur).',
    }),
    defineField({
      name: 'keywords',
      title: 'Açar Sözlər',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
});
