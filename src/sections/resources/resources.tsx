'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Calculator, ListChecks, Brain, Mail, LineChart, ArrowUpRight, Download } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { RESOURCES } from '@/lib/market-data';
import { useCursor } from '@/components/providers/cursor-provider';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  book: BookOpen,
  calculator: Calculator,
  checklist: ListChecks,
  brain: Brain,
  mail: Mail,
  chart: LineChart,
};

export function ResourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { setVariant } = useCursor();

  return (
    <section
      id="resources"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/[0.06] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Free Resources"
            title={
              <>
                Start with the tools{' '}
                <span className="italic text-gradient-aurora">we use ourselves.</span>
              </>
            }
            subtitle="The same frameworks, checklists, and templates Ankit uses every day — given away for free. No email gate, no tricks."
          />
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={() => setVariant('enroll', 'Get')}
            onMouseLeave={() => setVariant('default')}
            className="inline-flex h-12 items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/[0.08] lg:self-end"
          >
            <Download className="h-4 w-4" />
            Get All Free Resources
          </motion.a>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => {
            const Icon = ICON_MAP[r.icon] || BookOpen;
            return (
              <motion.a
                key={r.title}
                href={r.href}
                download={(r as any).download ? true : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                onMouseEnter={() => setVariant('view', 'Get')}
                onMouseLeave={() => setVariant('default')}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-all hover:border-white/[0.15]"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-electric-400" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                    {r.type}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{r.description}</p>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors group-hover:text-white">
                  Download free
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
