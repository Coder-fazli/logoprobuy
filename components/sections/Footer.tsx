import Link from 'next/link';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Browse Logos', href: '/logos' },
      { label: 'Featured', href: '/#logos' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Licensing', href: '/licensing' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socials = [
  {
    label: 'X (Twitter)',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white">

      {/* Main footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 grid grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">

        {/* Logo + tagline — spans 2 cols on mobile, 2 on desktop */}
        <div className="flex flex-col gap-4 col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="text-[#111111] text-sm font-bold">L</span>
            </div>
            <span className="text-white font-semibold text-base tracking-tight">LogoBuyPro</span>
          </Link>
          <p className="text-sm text-white/55 leading-relaxed max-w-[220px]">
            Own the logo. Own the brand. Thousands of exclusive designs, ready today.
          </p>
        </div>

        {/* 3 link columns */}
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {col.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}


      </div>

      {/* Social bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Follow Me</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {socials.map(({ svg, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4">{svg}</span>
                <span className="hidden xs:inline sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 h-12 flex items-center justify-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} LogoBuyPro. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
