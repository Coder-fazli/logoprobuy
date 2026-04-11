import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import React from 'react';

function StudioLogo() {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 4px',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 13,
          color: '#fff',
          letterSpacing: '-0.5px',
          flexShrink: 0,
        },
      },
      'LB'
    ),
    React.createElement(
      'span',
      {
        style: {
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '-0.3px',
        },
      },
      'LogoBuyPro'
    )
  );
}

export default defineConfig({
  name: 'logobuypro',
  title: 'LogoBuyPro',
  projectId: 'b4t4y7ug',
  dataset: 'production',
  basePath: '/studio',

  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Məzmun')
          .items([
            // Singletons
            S.listItem()
              .title('Ana Səhifə')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Ana Səhifə')
              ),
            S.listItem()
              .title('Haqqımda Səhifəsi')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
                  .title('Haqqımda Səhifəsi')
              ),
            S.listItem()
              .title('Əlaqə Səhifəsi')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
                  .title('Əlaqə Səhifəsi')
              ),
            S.divider(),
            S.listItem().title('Loqolar').id('logo').child(
              S.documentTypeList('logo').title('Loqolar')
            ),
            S.listItem().title('Kateqoriyalar').id('category').child(
              S.documentTypeList('category').title('Kateqoriyalar')
            ),
            S.divider(),
            S.listItem().title('Blog Yazıları').id('post').child(
              S.documentTypeList('post').title('Blog Yazıları')
            ),
            S.listItem().title('Səhifələr').id('page').child(
              S.documentTypeList('page').title('Səhifələr')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
