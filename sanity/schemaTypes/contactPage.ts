import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Əlaqə Səhifəsi',
  type: 'document',

  fields: [
    defineField({
      name: 'headline',
      title: 'Başlıq',
      type: 'string',
      description: 'Məs: "Let\'s work together!"',
      initialValue: "Let's work together!",
    }),
    defineField({
      name: 'email',
      title: 'E-poçt Ünvanı',
      type: 'string',
      initialValue: 'hello@logobuypro.com',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'replyTime',
      title: 'Cavab Müddəti Mətni',
      type: 'string',
      description: 'Məs: "Get a reply to you within 1 - 8 hrs"',
      initialValue: 'Get a reply to you within 1 - 8 hrs',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Əlaqə Səhifəsi' };
    },
  },
});
