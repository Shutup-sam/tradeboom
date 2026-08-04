'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { FAQ_ITEMS } from '@/lib/market-data';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [open, setOpen] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on query search
  const filteredFAQs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section
      id="faq"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-white/[0.05] py-24 sm:py-32 bg-ink-950"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently Asked"
          title={
            <>
              The honest answers to{' '}
              <span className="italic text-gradient-aurora">the questions you have.</span>
            </>
          }
          align="center"
        />

        {/* Live Search Bar */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search questions (e.g. beginner, refund, SEBI)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpen(null); // Close active FAQ when searching
              }}
              className="w-full h-11 rounded-full border border-white/[0.08] bg-white/[0.02] pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-electric-400/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-electric-400/20"
            />
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/30" />
          </div>
        </div>

        {/* FAQs List */}
        <div className="mt-16 space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item, index) => {
                // Find actual index in raw array to prevent duplicate ID issues
                const actualIndex = FAQ_ITEMS.indexOf(item);
                const isOpen = open === actualIndex;

                return (
                  <motion.div
                    key={item.question}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-300',
                      isOpen
                        ? 'border-white/[0.15] bg-white/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02]',
                    )}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : actualIndex)}
                      className="group flex w-full items-center gap-4 p-5 text-left sm:p-6"
                      aria-expanded={isOpen}
                    >
                      <span className="font-mono text-[11px] text-white/30">
                        {String(actualIndex + 1).padStart(2, '0')}
                      </span>
                      <h3 className="flex-1 text-base font-medium text-white sm:text-lg">
                        {item.question}
                      </h3>
                      <span
                        className={cn(
                          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                          isOpen
                            ? 'border-white/20 bg-white text-ink-950'
                            : 'border-white/10 bg-white/[0.04] text-white/70 group-hover:bg-white/[0.08]',
                        )}
                      >
                        <Plus
                          className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-45')}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pl-12 sm:px-6 sm:pb-6 sm:pl-14">
                            <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
              >
                <p className="text-sm text-white/40">No questions found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-semibold text-electric-400 hover:text-electric-300 transition-colors"
                >
                  Clear search query
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
