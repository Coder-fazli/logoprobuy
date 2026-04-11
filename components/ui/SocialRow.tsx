'use client';

import { useState } from 'react';

interface Props {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  dribbble?: string;
}

const ICONS: Record<string, JSX.Element> = {
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  ),
  dribbble: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.629 0 12-5.372 12-12 0-6.627-5.371-12-12-12zm7.919 5.593a10.14 10.14 0 0 1 2.298 6.363c-.335-.071-3.689-.748-7.064-.325-.076-.185-.147-.375-.228-.562-.21-.506-.438-1.01-.674-1.5 3.7-1.508 5.394-3.684 5.668-3.976zM12 2.004c2.456 0 4.705.885 6.435 2.343-.242.265-1.768 2.293-5.337 3.628C11.277 5.85 9.44 3.89 9.16 3.572A10.148 10.148 0 0 1 12 2.004zM7.044 4.395c.268.3 2.148 2.267 3.99 5.35-5.034 1.338-9.478 1.312-9.952 1.305A10.15 10.15 0 0 1 7.044 4.395zM1.977 12.01l.028-.467c.46.01 5.68.055 11.047-1.527.309.605.6 1.219.864 1.838-.14.039-.283.082-.422.127-5.544 1.788-8.49 6.675-8.737 7.09A10.124 10.124 0 0 1 1.977 12.01zm10.023 10.013a10.13 10.13 0 0 1-6.158-2.076c.21-.404 2.592-4.985 8.677-7.107l.07-.023a36.994 36.994 0 0 1 1.898 6.74 10.1 10.1 0 0 1-4.487 2.466zm6.32-1.768a38.735 38.735 0 0 0-1.76-6.26c3.147-.504 5.905.321 6.245.426a10.18 10.18 0 0 1-4.485 5.834z" />
    </svg>
  ),
};

const ALL = [
  { key: 'twitter'   as const, label: 'X (Twitter)' },
  { key: 'instagram' as const, label: 'Instagram'   },
  { key: 'linkedin'  as const, label: 'LinkedIn'    },
  { key: 'youtube'   as const, label: 'YouTube'     },
  { key: 'dribbble'  as const, label: 'Dribbble'    },
];

function Icon({ href, label, iconKey }: { href?: string; label: string; iconKey: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      onClick={!href ? (e) => e.preventDefault() : undefined}
      style={{
        color: hovered ? '#000' : 'rgba(0,0,0,0.35)',
        transition: 'color 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {ICONS[iconKey]}
    </a>
  );
}

export default function SocialRow(props: Props) {
  const urls = props as Record<string, string | undefined>;
  return (
    <div className="flex items-center gap-5">
      {ALL.map(({ key, label }) => (
        <Icon key={key} href={urls[key]} label={label} iconKey={key} />
      ))}
    </div>
  );
}
