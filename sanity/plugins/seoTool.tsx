'use client';

import React, { useState } from 'react';
import { definePlugin } from 'sanity';

const BASE = 'https://logobuypro.com';

const PAGES = [
  { label: 'Ana Səhifə', path: '/', desc: 'Home page' },
  { label: 'Haqqımda', path: '/about', desc: 'About page' },
  { label: 'Əlaqə', path: '/contact', desc: 'Contact page' },
];

const SEO_TOOLS = [
  {
    label: 'Google PageSpeed',
    icon: '⚡',
    url: (path: string) =>
      `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(BASE + path)}`,
  },
  {
    label: 'Google Rich Results',
    icon: '🔍',
    url: (path: string) =>
      `https://search.google.com/test/rich-results?url=${encodeURIComponent(BASE + path)}`,
  },
  {
    label: 'Open Graph Preview',
    icon: '🖼️',
    url: (path: string) =>
      `https://www.opengraph.xyz/url/${encodeURIComponent(BASE + path)}`,
  },
  {
    label: 'Canlı Səhifə',
    icon: '🌐',
    url: (path: string) => BASE + path,
  },
];

function PageCard({ label, path, desc }: { label: string; path: string; desc: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '20px 24px',
        background: '#fff',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          📄
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{label}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{BASE + path}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SEO_TOOLS.map((tool) => (
          <a
            key={tool.label}
            href={tool.url(path)}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(tool.label)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: hovered === tool.label ? '#111' : '#d1d5db',
              background: hovered === tool.label ? '#111' : '#f9fafb',
              color: hovered === tool.label ? '#fff' : '#374151',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              cursor: 'pointer',
            }}
          >
            <span>{tool.icon}</span>
            {tool.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function SeoPanel() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '32px 24px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: 0 }}>
          SEO Yoxlama
        </h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 6 }}>
          Hər səhifəni aşağıdakı alətlərlə yoxlayın
        </p>
      </div>

      {PAGES.map((page) => (
        <PageCard key={page.path} {...page} />
      ))}

      <div
        style={{
          marginTop: 32,
          padding: '20px 24px',
          borderRadius: 12,
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 14, color: '#15803d', marginBottom: 10 }}>
          📋 SEO Yoxlama Siyahısı
        </div>
        {[
          'Hər logo səhifəsinin meta başlığı var',
          'Meta təsvir 150 simvoldan azdır',
          'Open Graph şəkilləri yüklənib',
          'PageSpeed mobil balı 80+',
          'Sitemap.xml mövcuddur',
          'robots.txt düzgün konfiqurasiya edilib',
        ].map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              color: '#374151',
              marginBottom: 6,
            }}
          >
            <span style={{ color: '#16a34a', fontSize: 16 }}>✓</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeoIcon() {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 20,
      height: 20,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('circle', { cx: 11, cy: 11, r: 8 }),
    React.createElement('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 })
  );
}

export const seoTool = definePlugin({
  name: 'seo-tool',
  tools: [
    {
      name: 'seo-check',
      title: 'SEO',
      icon: SeoIcon,
      component: SeoPanel,
    },
  ],
});
