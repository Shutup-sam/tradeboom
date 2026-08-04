'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Send,
  MessageCircle,
  Youtube,
  Instagram,
  Mail,
  ArrowUpRight,
  Globe,
  ChevronUp,
  Heart,
  Zap,
  Check,
} from 'lucide-react';
import { NAV_LINKS } from '@/lib/market-data';
import { useCursor } from '@/components/providers/cursor-provider';
import { subscribeNewsletter } from '@/actions/actions';
import type { LucideIcon } from 'lucide-react';

const SOCIALS: Array<{ name: string; icon: LucideIcon; href: string; color: string }> = [
  { name: 'Telegram', icon: Send, href: '#', color: 'hover:border-sky-400/40 hover:text-sky-400' },
  { name: 'Discord', icon: MessageCircle, href: '#', color: 'hover:border-indigo-400/40 hover:text-indigo-400' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:border-red-400/40 hover:text-red-400' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:border-pink-400/40 hover:text-pink-400' },
  { name: 'Email', icon: Mail, href: '#', color: 'hover:border-emerald-400/40 hover:text-emerald-400' },
];

const FOOTER_COLS = [
  {
    title: 'Learn',
    links: [
      { label: 'Courses', href: '#courses' },
      { label: 'Mentorship', href: '#mentorship' },
      { label: 'Free Resources', href: '#resources' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Results', href: '#results' },
      { label: 'Community', href: '#community' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Disclaimer', href: '#disclaimer' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  },
];

export function Footer() {
  const { setVariant } = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [emailFocused, setEmailFocused] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [subLoading, setSubLoading] = useState(false);
  const [subStatus, setSubStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    setSubLoading(true);
    setSubStatus(null);
    try {
      const res = await subscribeNewsletter(subEmail);
      setSubStatus(res);
      if (res.success) {
        setSubEmail('');
      }
    } catch {
      setSubStatus({ success: false, message: 'Something went wrong. Please try again.' });
    } finally {
      setSubLoading(false);
    }
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer id="footer" className="relative isolate overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-400/30 to-transparent" />

      {/* Aurora glow effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute -bottom-1/2 left-1/4 h-[500px] w-[600px] rounded-full bg-electric-500/[0.04] blur-[150px]" />
        <div className="absolute -bottom-1/3 right-1/4 h-[400px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Newsletter CTA strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-electric-500/[0.06] via-white/[0.02] to-emerald-500/[0.04] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-electric-400/20 bg-electric-400/10">
                <Zap className="h-5 w-5 text-electric-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Weekly Market Insights</p>
                <p className="text-xs text-white/50">Free frameworks, psychology tips, and market prep — every Monday.</p>
              </div>
            </div>
            {subStatus?.success ? (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 border border-emerald-500/20">
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">{subStatus.message}</span>
              </div>
            ) : (
              <form className="flex w-full flex-col sm:flex-row items-center gap-2 sm:w-auto" onSubmit={handleSubscribe}>
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                  <div className={`relative flex-1 sm:w-64 transition-all duration-300 ${emailFocused ? 'ring-1 ring-electric-400/40' : ''} rounded-xl`}>
                    <input
                      type="email"
                      required
                      aria-label="Email address for weekly newsletter"
                      aria-invalid={subStatus && !subStatus.success ? true : undefined}
                      aria-describedby={subStatus && !subStatus.success ? 'newsletter-error' : undefined}
                      placeholder="you@example.com"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-electric-400/40 focus:bg-white/[0.05] focus:ring-1 focus-visible:ring-1 focus-visible:ring-electric-400/40"
                    />
                  </div>
                  {subStatus && !subStatus.success && (
                    <p id="newsletter-error" className="text-[10px] text-crimson-400 font-semibold pl-1" role="alert">
                      {subStatus.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={subLoading}
                  onMouseEnter={() => setVariant('enroll', 'Subscribe')}
                  onMouseLeave={() => setVariant('default')}
                  className="inline-flex h-10 w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-xl bg-electric-500 px-4 text-sm font-medium text-white transition-all hover:bg-electric-400 hover:shadow-glow-blue active:scale-[0.97]"
                >
                  {subLoading ? 'Subscribing...' : 'Subscribe'}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Main grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="text-base font-semibold tracking-tight text-white">
                Trade<span className="text-white/50">Boom</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Premium trading education by Ankit Kumar and Rishav Kumar. Built for traders who value discipline,
              process, and consistency over shortcuts.
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/40">
              Address: C-609, 6th Floor, Tower C, Spectrum Mall, Noida Sector 75, Noida - 201301
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  onMouseEnter={() => setVariant('view', 'Visit')}
                  onMouseLeave={() => setVariant('default')}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 transition-all duration-300 hover:bg-white/[0.06] hover:scale-110 ${s.color}`}
                  aria-label={s.name}
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {/* Trust badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[11px] text-emerald-400/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              12,400+ traders enrolled
            </div>
          </motion.div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onMouseEnter={() => setVariant('hover', 'View')}
                      onMouseLeave={() => setVariant('default')}
                      className="group inline-flex items-center gap-1 text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 -translate-x-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Disclaimer Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 backdrop-blur-md"
        >
          <p className="text-[11px] leading-relaxed text-white/40">
            <strong>SEBI Disclaimer:</strong> Please note that Trade Boom is not registered with SEBI. If you are considering investing in financial, derivatives, index, or advisory products, we strongly recommend that you consult your financial advisor before making any investment decisions. All educational materials, courses, and resources provided by Trade Boom are for educational and learning purposes only and should not be construed as investment or advisory advice.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 h-px origin-left bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent"
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Trade Boom by Ankit Kumar & Rishav Kumar. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-xs text-white/35">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3 w-3" />
                India · Global Students
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:inline-block" />
              <span className="inline-flex items-center gap-1">
                Made with <Heart className="h-2.5 w-2.5 text-crimson-400" /> for traders
              </span>
            </div>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setVariant('hover', 'Top')}
            onMouseLeave={() => setVariant('default')}
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-white/50 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
            aria-label="Scroll to top"
          >
            <span className="hidden sm:inline">Back to top</span>
            <ChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <div className="relative h-8 w-8">
      <Image
        src="/logo.svg"
        alt="Trade Boom Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
