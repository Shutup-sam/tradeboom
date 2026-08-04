'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MessageCircle, Video, Target, BookOpen, BarChart3, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { MagneticButton } from '@/components/ui/button';
import { useCursor } from '@/components/providers/cursor-provider';

export function MentorshipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { setVariant } = useCursor();

  return (
    <section
      id="mentorship"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 h-96 w-96 rounded-full bg-electric-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: content */}
          <div>
            <SectionHeading
              eyebrow="1-on-1 Mentorship"
              title={
                <>
                  The fastest way to{' '}
                  <span className="italic text-gradient-aurora">build real skill.</span>
                </>
              }
              subtitle="Direct, personal, and uncompromising. A small group of traders gets weekly access to Ankit for trade reviews, strategy refinement, and personal accountability."
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MagneticButton
                size="lg"
                variant="primary"
                href="#contact"
                onMouseEnter={() => setVariant('enroll', 'Apply')}
                onMouseLeave={() => setVariant('default')}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Apply for Mentorship
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="outline"
                href="#faq"
                onMouseEnter={() => setVariant('view', 'View')}
                onMouseLeave={() => setVariant('default')}
                icon={<Calendar className="h-4 w-4" />}
              >
                Book a Discovery Call
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: program details */}
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Video,
                  title: 'Weekly Live Sessions',
                  body: '2 hours of direct interaction. Screen-share trade reviews and live market analysis.',
                },
                {
                  icon: MessageCircle,
                  title: 'Private Channel',
                  body: 'Direct line to Ankit for questions, trade ideas, and accountability checks.',
                },
                {
                  icon: Target,
                  title: 'Trade Reviews',
                  body: 'Weekly review of your journal — entries, exits, and process improvements.',
                },
                {
                  icon: BarChart3,
                  title: 'Custom Playbook',
                  body: 'We build your personal strategy framework around your style and risk tolerance.',
                },
                {
                  icon: BookOpen,
                  title: 'Curated Curriculum',
                  body: 'No fluff. Just the modules you need, in the order you need them.',
                },
                {
                  icon: Calendar,
                  title: 'Lifetime Alumni Access',
                  body: 'Once a student, always a student. Stay connected to the inner circle.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-white/[0.15] hover:bg-white/[0.04]"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <item.icon className="h-4 w-4 text-electric-400" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
