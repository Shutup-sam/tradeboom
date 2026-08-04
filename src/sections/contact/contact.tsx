'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useActionState } from 'react';
import { Mail, MessageCircle, Send, ArrowRight, Check, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { MagneticButton } from '@/components/ui/button';
import { useCursor } from '@/components/providers/cursor-provider';
import { cn } from '@/lib/utils';
import { submitContactForm } from '@/actions/actions';

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { setVariant } = useCursor();
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-electric-500/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/[0.06] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: copy */}
          <div>
            <SectionHeading
              eyebrow="Get In Touch"
              title={
                <>
                  Let&apos;s talk about{' '}
                  <span className="italic text-gradient-aurora">your trading.</span>
                </>
              }
              subtitle="Whether you have a question about a course, want to apply for the mentorship program, or just want to say hello — we read every message."
            />

            <div className="mt-10 space-y-3">
              {[
                { icon: Mail, label: 'Email', value: 'tradeboom.vda@gmail.com', href: 'mailto:tradeboom.vda@gmail.com' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+91 87965 10028', href: 'https://wa.me/918796510028' },
                { icon: MapPin, label: 'Address', value: 'C-609, 6th Floor, Spectrum Mall, Noida Sector 75, Noida - 201301', href: '#' },
                { icon: Send, label: 'Telegram', value: '@tradeboom', href: '#' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  onMouseEnter={() => setVariant('view', 'Open')}
                  onMouseLeave={() => setVariant('default')}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <item.icon className="h-4 w-4 text-electric-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                      {item.label}
                    </p>
                    <p className="text-sm text-white/80">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Response time</p>
              <p className="mt-1 text-sm text-white/80">Within 12 hours, every day of the week.</p>
            </div>
          </div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-2xl sm:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-electric-500/15 blur-3xl" />

            {state?.success ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-light text-white">
                  Message received.
                </h3>
                <p className="mt-3 max-w-sm text-sm text-white/60">
                  We&apos;ll get back to you within 12 hours. In the meantime, check your inbox for
                  a free trading journal template.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="First name"
                    name="firstName"
                    placeholder="Ankit"
                    required
                    error={state?.errors?.firstName?.[0]}
                  />
                  <Field
                    label="Last name"
                    name="lastName"
                    placeholder="Kirola"
                    error={state?.errors?.lastName?.[0]}
                  />
                </div>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  error={state?.errors?.email?.[0]}
                />
                <SelectField
                  label="I'm interested in"
                  name="interest"
                  options={[
                    'Beginner Trading',
                    'Price Action',
                    'Swing Trading',
                    'Intraday',
                    'Options',
                    'Forex',
                    'Crypto',
                    '1-on-1 Mentorship',
                    'Just saying hi',
                  ]}
                  error={state?.errors?.interest?.[0]}
                />
                <Field
                  label="Message"
                  name="message"
                  placeholder="Tell us a little about your trading journey..."
                  textarea
                  error={state?.errors?.message?.[0]}
                />

                {state?.message && !state.success && (
                  <p className="text-xs text-crimson-400 font-semibold text-center">{state.message}</p>
                )}

                <MagneticButton
                  size="lg"
                  variant="primary"
                  type="submit"
                  fullWidth
                  disabled={isPending}
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  {isPending ? 'Sending...' : 'Send Message'}
                </MagneticButton>
                <p className="text-center text-[11px] text-white/40">
                  By submitting, you agree to receive educational emails. Unsubscribe anytime.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
};

function Field({ label, name, type = 'text', placeholder, required, textarea, error }: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="block">
      <label htmlFor={id} className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
        {label}
        {required && <span className="ml-0.5 text-electric-400" aria-hidden="true">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-2 w-full rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all focus:bg-white/[0.04] focus:ring-1 focus-visible:ring-1 focus-visible:ring-electric-400/40',
            error ? 'border-crimson-500/50 focus:border-crimson-500' : 'border-white/[0.08] focus:border-electric-400/50',
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-2 h-11 w-full rounded-xl border bg-white/[0.02] px-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:bg-white/[0.04] focus:ring-1 focus-visible:ring-1 focus-visible:ring-electric-400/40',
            error ? 'border-crimson-500/50 focus:border-crimson-500' : 'border-white/[0.08] focus:border-electric-400/50',
          )}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs text-crimson-400 font-semibold" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  const id = `select-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="block">
      <label htmlFor={id} className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'mt-2 h-11 w-full rounded-xl border bg-white/[0.02] px-4 text-sm text-white outline-none transition-all focus:bg-white/[0.04] focus:ring-1 focus-visible:ring-1 focus-visible:ring-electric-400/40',
          error ? 'border-crimson-500/50 focus:border-crimson-500' : 'border-white/[0.08] focus:border-electric-400/50',
        )}
      >
        <option value="" disabled className="bg-ink-900 text-white/40">
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink-900 text-white">
            {o}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-crimson-400 font-semibold" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
