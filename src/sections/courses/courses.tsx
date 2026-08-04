'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Clock, Award, Users, BookOpen, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { COURSES } from '@/lib/market-data';
import { MagneticButton } from '@/components/ui/button';
import { useCursor } from '@/components/providers/cursor-provider';
import { cn } from '@/lib/utils';

export function CoursesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="courses"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 bg-aurora-blue opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Premium Curriculum"
          title={
            <>
              Seven courses.{' '}
              <span className="italic text-gradient-aurora">One standard.</span>
            </>
          }
          subtitle="Every program is built on the same principles: rigorous frameworks, live mentorship, and a community of serious traders. Choose your starting point."
          align="center"
        />

        {/* Featured course */}
        <div className="mt-16">
          <FeaturedCourse />
        </div>

        {/* Course grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.filter((c) => c.id !== 'price-action').map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCourse() {
  const course = COURSES.find((c) => c.id === 'price-action')!;
  const { setVariant } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-electric-500/[0.08] via-ink-900/50 to-emerald-500/[0.05] p-8 backdrop-blur-xl sm:p-10 lg:p-12"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-electric-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-electric-400/30 bg-electric-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-300">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </div>
          <h3 className="mt-5 text-3xl font-light text-white sm:text-4xl lg:text-5xl">
            {course.title}
          </h3>
          <p className="mt-2 text-lg text-white/60">{course.subtitle}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{course.level}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              18 live sessions
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div>
              <p className="font-display text-4xl font-light text-white sm:text-5xl">
                ₹{course.price.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-white/40 line-through">
                ₹{course.originalPrice.toLocaleString('en-IN')}
              </p>
            </div>
            <MagneticButton
              variant="primary"
              size="lg"
              href="#contact"
              onMouseEnter={() => setVariant('enroll', 'Enroll')}
              onMouseLeave={() => setVariant('default')}
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Enroll Now
            </MagneticButton>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            What you get
          </p>
          {course.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm"
            >
              <div className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-electric-500/20">
                <Check className="h-3 w-3 text-electric-300" />
              </div>
              <span className="text-sm text-white/80">{feature}</span>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {course.bonuses.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300"
              >
                <Award className="h-3 w-3" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CourseCard({
  course,
  index,
}: {
  course: (typeof COURSES)[number];
  index: number;
}) {
  const { setVariant } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setVariant('view', 'View')}
      onMouseLeave={() => setVariant('default')}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-colors hover:border-white/[0.15]"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-electric-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          <TrendingUp className="h-4 w-4 text-electric-400" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
          {course.level}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-light text-white">{course.title}</h3>
      <p className="mt-1 text-sm text-white/50">{course.subtitle}</p>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/55">
        {course.description}
      </p>

      <ul className="mt-5 space-y-2">
        {course.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-white/65">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {course.bonuses.slice(0, 2).map((b) => (
          <span
            key={b}
            className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/50"
          >
            {b}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-white/[0.06] pt-5">
        <div>
          <p className="font-display text-2xl font-light text-white">
            ₹{course.price.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-white/40 line-through">
            ₹{course.originalPrice.toLocaleString('en-IN')}
          </p>
        </div>
        <a
          href="#contact"
          className={cn(
            'inline-flex h-9 items-center gap-1.5 rounded-full bg-white/[0.04] px-4 text-xs font-medium text-white transition-all',
            'group-hover:bg-white group-hover:text-ink-950',
          )}
        >
          Enroll
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
