'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';

const NAV_ITEMS = [
  { id: 1, label: 'Shop',    href: '/logos' },
  { id: 2, label: 'About',   href: '/about',   newTab: true },
  { id: 3, label: 'Contact', href: '/contact', newTab: true },
];

interface NavbarProps {
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export default function Navbar({ logoUrl, logoAlt, logoWidth = 140, logoHeight = 40 }: NavbarProps) {
  const pathname = usePathname();
  const currentItem = NAV_ITEMS.find((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ?? NAV_ITEMS[0];
  const [active, setActive] = useState(currentItem);
  const [isHover, setIsHover] = useState<typeof NAV_ITEMS[0] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(item: typeof NAV_ITEMS[0]) {
    setActive(item);
    setMenuOpen(false);
    window.open(item.href, item.newTab ? '_blank' : '_self');
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 h-16 grid grid-cols-[1fr_auto_1fr] items-center">

          {/* Logo — always left column */}
          <a href="/" className="flex items-center justify-start">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={logoAlt ?? 'LogoBuyPro'}
                style={{ height: logoHeight, width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                  <span className="text-background text-sm font-bold">L</span>
                </div>
                <span className="text-foreground font-semibold text-base tracking-tight">LogoBuyPro</span>
              </div>
            )}
          </a>

          {/* Desktop nav — always centre column */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    'py-2 relative duration-300 transition-colors hover:!text-foreground text-base font-semibold',
                    active.id === item.id ? 'text-foreground' : 'text-foreground/60'
                  )}
                  onClick={() => navigate(item)}
                  onMouseEnter={() => setIsHover(item)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <div className="px-5 py-2 relative">
                    {item.label}
                    {isHover?.id === item.id && (
                      <motion.div
                        layoutId="hover-bg"
                        className="absolute inset-0 w-full h-full bg-primary/10"
                        style={{ borderRadius: 6 }}
                      />
                    )}
                  </div>
                  {active.id === item.id && (
                    <motion.div
                      layoutId="active"
                      className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                    />
                  )}
                  {isHover?.id === item.id && (
                    <motion.div
                      layoutId="hover"
                      className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </ul>
          </nav>

          {/* Right column — mobile toggle (desktop stays empty) */}
          <div className="flex items-center justify-end">
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <MenuToggleIcon open={menuOpen} className="w-7 h-7" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border md:hidden"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item)}
                  className={cn(
                    'text-left py-4 text-lg font-semibold border-b border-border last:border-0 transition-colors',
                    active.id === item.id ? 'text-foreground' : 'text-foreground/50'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
