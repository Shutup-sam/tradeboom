'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '@/lib/market-data';
import { cn } from '@/lib/utils';
import { useCursor } from '@/components/providers/cursor-provider';
import Image from 'next/image';

// Primary links shown directly in the navbar (keep it tight)
const PRIMARY_LINKS = NAV_LINKS.slice(0, 5); // Home, About, Courses, Results, Mentorship
// Overflow links shown in "More" dropdown
const MORE_LINKS = NAV_LINKS.slice(5); // Community, Blog, FAQ, Contact

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { setVariant } = useCursor();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close "More" dropdown on scroll
  useEffect(() => {
    const onScroll = () => setMoreOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed z-50 transition-all duration-500',
          // Mobile: full width positioned directly below the fixed ribbon
          'left-0 top-[calc(36px+env(safe-area-inset-top,0px))] w-full translate-x-0 bg-ink-950/80 border-b border-white/[0.08] backdrop-blur-2xl',
          // Tablet & Desktop: floating capsule layout with 20px gap below the 36px fixed ribbon
          'sm:left-1/2 sm:top-14 sm:w-[calc(100%-2rem)] sm:max-w-5xl sm:-translate-x-1/2 sm:bg-transparent sm:border-none sm:backdrop-blur-none',
          scrolled && [
            // Mobile scrolled styling
            'bg-ink-950/95 border-white/[0.12] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.6)]',
            // Reset mobile scrolled background/shadow on desktop
            'sm:bg-transparent sm:shadow-none',
          ],
        )}
      >
        <nav
          className={cn(
            'flex h-14 items-center justify-between transition-all duration-500 px-4',
            // Tablet & Desktop: capsule styling
            'sm:h-16 sm:rounded-full sm:border sm:border-white/[0.08] sm:bg-ink-900/60 sm:px-4 sm:backdrop-blur-2xl',
            scrolled && [
              // Tablet & Desktop scrolled styling
              'sm:border-white/[0.12] sm:bg-ink-900/80 sm:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]',
            ],
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onMouseEnter={() => setVariant('hover', 'Home')}
            onMouseLeave={() => setVariant('default')}
            className="flex shrink-0 items-center gap-2 px-2"
          >
            <Logo />
            <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
              Trade<span className="text-white/50">Boom</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {PRIMARY_LINKS.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setVariant('hover', 'View')}
                  onMouseLeave={() => setVariant('default')}
                  className="relative rounded-full px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}

            {/* More button */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onMouseEnter={() => setVariant('hover', 'More')}
                onMouseLeave={() => setVariant('default')}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white',
                  moreOpen && 'text-white bg-white/[0.06]',
                )}
              >
                More
                <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', moreOpen && 'rotate-180')} />
              </button>

              {/* More dropdown */}
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-white/[0.1] bg-ink-900/95 p-1.5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                  >
                    {MORE_LINKS.map((link) => {
                      const id = link.href.replace('#', '');
                      const isActive = activeSection === id;
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setMoreOpen(false)}
                          onMouseEnter={() => setVariant('hover', 'View')}
                          onMouseLeave={() => setVariant('default')}
                          className={cn(
                            'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white',
                            isActive && 'bg-white/[0.04] text-white',
                          )}
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#contact"
              onMouseEnter={() => setVariant('enroll', 'Enroll')}
              onMouseLeave={() => setVariant('default')}
              className="group hidden h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-medium text-ink-950 transition-all hover:bg-white/90 sm:inline-flex"
            >
              Start Learning
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] xl:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-white/10 bg-ink-900 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-base font-medium text-white/80 hover:bg-white/[0.04]"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-ink-950"
                >
                  Start Learning
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <div className="relative h-8 w-8">
      <Image
        src="/logo.svg"
        alt="Trade Boom Logo"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
}
