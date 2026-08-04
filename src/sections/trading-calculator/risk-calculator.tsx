'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Wallet, Percent, ShieldAlert, ArrowUpRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { useCursor } from '@/components/providers/cursor-provider';

export function RiskCalculator() {
  const { setVariant } = useCursor();

  // Inputs
  const [accountSize, setAccountSize] = useState<number>(100000);
  const [riskPercentage, setRiskPercentage] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [stopLossPrice, setStopLossPrice] = useState<number>(490);

  // Calculations
  const riskAmount = accountSize * (riskPercentage / 100);
  const riskPerShare = entryPrice - stopLossPrice;
  const shareQty = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
  const totalValue = shareQty * entryPrice;

  // Validation / Warning states
  const isValidPrices = entryPrice > 0 && stopLossPrice > 0;
  const isStopLossInvalid = stopLossPrice >= entryPrice;
  const isLeverageNeeded = totalValue > accountSize;

  return (
    <section
      id="calculator"
      className="relative isolate overflow-hidden border-t border-white/[0.05] bg-ink-950 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/[0.04] blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[30rem] w-[30rem] translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trading Tools"
          title={
            <>
              Calculate position sizing{' '}
              <span className="italic text-gradient-aurora">like a pro.</span>
            </>
          }
          subtitle="Risk management is the difference between a gambler and a professional trader. Use this interactive calculator to manage your capital before every trade."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Inputs Section */}
          <div className="lg:col-span-7 flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.01] p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-electric-400" />
              Trade Parameters
            </h3>

            {/* Input 1: Account Size */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="calc-account-size" className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5 text-white/40" />
                  Account Size (INR)
                </label>
                <input
                  id="calc-account-size"
                  type="number"
                  value={accountSize || ''}
                  onChange={(e) => setAccountSize(Number(e.target.value))}
                  className="w-32 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-sm font-semibold text-white focus:border-electric-400 focus:outline-none tabular-nums text-right"
                />
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={accountSize}
                onChange={(e) => setAccountSize(Number(e.target.value))}
                className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-electric-400 focus:outline-none"
              />
            </div>

            {/* Input 2: Risk Percentage */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="calc-risk-percentage" className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-white/40" />
                  Risk Percentage (%)
                </label>
                <input
                  id="calc-risk-percentage"
                  type="number"
                  step="0.1"
                  value={riskPercentage || ''}
                  onChange={(e) => setRiskPercentage(Number(e.target.value))}
                  className="w-20 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-sm font-semibold text-white focus:border-electric-400 focus:outline-none tabular-nums text-right"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0.2"
                  max="5"
                  step="0.1"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(Number(e.target.value))}
                  className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-white/10 accent-electric-400 focus:outline-none self-center"
                />
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => setRiskPercentage(val)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        riskPercentage === val
                          ? 'bg-electric-500 text-white'
                          : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08]'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inputs 3 & 4: Entry & Stop Loss */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="calc-entry-price" className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                  Entry Price (₹)
                </label>
                <input
                  id="calc-entry-price"
                  type="number"
                  value={entryPrice || ''}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-sm font-semibold text-white focus:border-electric-400 focus:outline-none tabular-nums"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="calc-stop-loss" className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                  Stop Loss Price (₹)
                </label>
                <input
                  id="calc-stop-loss"
                  type="number"
                  value={stopLossPrice || ''}
                  onChange={(e) => setStopLossPrice(Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 font-mono text-sm font-semibold text-white focus:border-electric-400 focus:outline-none tabular-nums"
                />
              </div>
            </div>
          </div>

          {/* Outputs Section */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Top light reflections */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-electric-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Position Calculations</h3>

              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
                    Max Risk Amount
                  </span>
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    ₹{riskAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
                    Risk Per Share
                  </span>
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    {riskPerShare > 0 ? `₹${riskPerShare.toLocaleString()}` : '—'}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
                    Position Quantity
                  </span>
                  <span className="font-mono text-3xl font-extrabold text-emerald-400 tabular-nums">
                    {shareQty > 0 ? shareQty.toLocaleString() : '0'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
                    Total Capital Needed
                  </span>
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Warnings block */}
            <div className="mt-8">
              {!isValidPrices ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-xs text-white/50">
                  <ShieldAlert className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
                  <span>Enter valid prices to calculate position parameters.</span>
                </div>
              ) : isStopLossInvalid ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-crimson-500/20 bg-crimson-500/5 p-3 text-xs text-crimson-400">
                  <AlertTriangle className="h-4 w-4 text-crimson-400 mt-0.5 shrink-0" />
                  <span>Stop loss must be lower than entry price for a long position.</span>
                </div>
              ) : isLeverageNeeded ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-gold-500/20 bg-gold-500/5 p-3 text-xs text-gold-400">
                  <AlertTriangle className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
                  <span>
                    Warning: Required capital exceeds account size. You will need a leverage of{' '}
                    <span className="font-bold">{(totalValue / accountSize).toFixed(1)}x</span> to make this trade.
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    Calculations healthy. Risk represents exactly{' '}
                    <span className="font-bold">{riskPercentage}%</span> of account equity. No leverage required.
                  </span>
                </div>
              )}

              {/* Mentorship CTA Link */}
              <a
                href="#contact"
                onMouseEnter={() => setVariant('enroll', 'Learn')}
                onMouseLeave={() => setVariant('default')}
                className="mt-6 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-xs font-semibold text-ink-950 transition-colors hover:bg-white/90"
              >
                Learn our strict risk strategy
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
