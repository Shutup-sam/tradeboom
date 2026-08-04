'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, MessageCircle, Youtube, Instagram, MessageSquare, Mail, ArrowUpRight, Users } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { COMMUNITY_LINKS } from '@/lib/market-data';
import { useCursor } from '@/components/providers/cursor-provider';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  telegram: Send,
  discord: MessageCircle,
  youtube: Youtube,
  instagram: Instagram,
  whatsapp: MessageSquare,
  mail: Mail,
};

export function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { setVariant } = useCursor();

  return (
    <section
      id="community"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Community"
          title={
            <>
              28,500+ traders.{' '}
              <span className="italic text-gradient-aurora">One standard.</span>
            </>
          }
          subtitle="The community is where the real work happens. Join the conversation, get accountability, and trade alongside serious people."
          align="center"
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_LINKS.map((link, i) => {
            const Icon = ICON_MAP[link.icon] || Users;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                onMouseEnter={() => setVariant('view', 'Join')}
                onMouseLeave={() => setVariant('default')}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:from-white/[0.06]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-electric-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-electric-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">{link.name}</h3>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{link.description}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/40">
                    <Users className="h-3 w-3" />
                    {link.members} members
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
