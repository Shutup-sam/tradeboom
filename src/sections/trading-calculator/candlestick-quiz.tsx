'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, AlertCircle, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { useCursor } from '@/components/providers/cursor-provider';

// Questions database containing candle shapes
const QUIZ_QUESTIONS = [
  {
    id: 1,
    name: 'Hammer Pattern',
    question: 'Identify this single candle pattern forming at the bottom of a steep downtrend:',
    correctAnswer: 'buy',
    explanation: 'Correct! This is a Hammer. The long lower shadow indicates that sellers drove prices down, but strong buying pressure pushed it back up to close near the high, signaling a bullish reversal.',
    wrongExplanation: 'Incorrect! This is a Hammer (Bullish Reversal - Buy). The long lower shadow/wick represents a strong rejection of lower prices by buyers, signaling the downtrend is reversing.',
    candles: [
      { open: 120, close: 100, high: 125, low: 90, color: 'red' },
      { open: 100, close: 75, high: 110, low: 65, color: 'red' },
      { open: 70, close: 68, high: 72, low: 30, color: 'green', highlight: true }, // Hammer shape
    ],
  },
  {
    id: 2,
    name: 'Bearish Engulfing',
    question: 'What market direction does this two-candle combo signal at the top of an uptrend?',
    correctAnswer: 'sell',
    explanation: 'Correct! This is a Bearish Engulfing pattern. The second large red candle completely engulfs the body of the previous small green candle, proving that sellers have hijacked momentum.',
    wrongExplanation: 'Incorrect! This is a Bearish Engulfing pattern (Bearish Reversal - Sell). The massive red candle body swallows the previous green body, indicating a strong pivot to the downside.',
    candles: [
      { open: 50, close: 70, high: 75, low: 45, color: 'green' },
      { open: 70, close: 85, high: 90, low: 65, color: 'green' },
      { open: 82, close: 87, high: 90, low: 80, color: 'green' },
      { open: 92, close: 55, high: 95, low: 50, color: 'red', highlight: true }, // Bearish engulfing red
    ],
  },
  {
    id: 3,
    name: 'Morning Star',
    question: 'Examine this three-candle formation after a prolonged market decline:',
    correctAnswer: 'buy',
    explanation: 'Correct! A Morning Star is a 3-candle bullish reversal pattern. It starts with a large red candle, shows indecision in the middle star, and finishes with a large green candle signaling recovery.',
    wrongExplanation: 'Incorrect! This is a Morning Star (Bullish Reversal - Buy). It indicates exhaustion of the selling trend and the launch of a new uptrend.',
    candles: [
      { open: 120, close: 80, high: 125, low: 75, color: 'red' },
      { open: 70, close: 68, high: 75, low: 55, color: 'red', highlight: true }, // Star
      { open: 72, close: 110, high: 115, low: 68, color: 'green', highlight: true }, // Reversal
    ],
  },
  {
    id: 4,
    name: 'Shooting Star',
    question: 'What direction is signaled by this candle when forming near a major resistance line?',
    correctAnswer: 'sell',
    explanation: 'Correct! This is a Shooting Star. The long upper shadow indicates that buyers pushed the price high during the session but were completely rejected, closing near the open.',
    wrongExplanation: 'Incorrect! This is a Shooting Star (Bearish Reversal - Sell). The long upper wick represents buyer exhaustion and a strong rejection of higher prices near the resistance line.',
    candles: [
      { open: 50, close: 70, high: 75, low: 45, color: 'green' },
      { open: 68, close: 90, high: 95, low: 65, color: 'green' },
      { open: 90, close: 93, high: 135, low: 88, color: 'red', highlight: true }, // Shooting star shape
    ],
  },
];

export function CandlestickQuiz() {
  const { setVariant } = useCursor();

  // Game States
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<'buy' | 'sell' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleAnswerSubmit = (answer: 'buy' | 'sell') => {
    if (isAnswered) return;
    setUserAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Score Rank Definitions
  const getRankInfo = (scoreValue: number) => {
    if (scoreValue === 4) {
      return {
        rank: 'Elite Price Action Trader',
        desc: 'Exceptional pattern recognition! You read charts like a pro. You have a solid grasp of trend reversals.',
        color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      };
    }
    if (scoreValue === 3) {
      return {
        rank: 'Technical Analyst',
        desc: 'Great job! You recognize core reversal structures correctly. A little refinement on risk control and you are ready.',
        color: 'text-electric-400 border-electric-500/20 bg-electric-500/5',
      };
    }
    if (scoreValue === 2) {
      return {
        rank: 'Chart Novice',
        desc: 'Decent effort. You spot some candles, but can be fooled by market traps. Learn rules-based setups.',
        color: 'text-gold-400 border-gold-500/20 bg-gold-500/5',
      };
    }
    return {
      rank: 'Emotional Gambler',
      desc: 'You are trading on gut feeling and random guesses. Sizing trades without rules is dangerous. Start with our beginner foundations.',
      color: 'text-crimson-400 border-crimson-500/20 bg-crimson-500/5',
    };
  };

  const rankInfo = getRankInfo(score);

  return (
    <section
      id="pattern-quiz"
      className="relative isolate overflow-hidden border-t border-white/[0.05] bg-ink-900 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interactive Quiz"
          title={
            <>
              Test your pattern{' '}
              <span className="italic text-gradient-aurora">recognition skills.</span>
            </>
          }
          subtitle="Do you know the difference between a breakout pattern and a bull trap? Click your bias below to see if you read market structure correctly."
          align="center"
        />

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-4xl rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.005] p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Ambient glows inside card */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!quizFinished ? (
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-8 md:grid-cols-12 items-center"
                >
                  {/* Left Side: SVG Chart Renderer */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] relative min-h-[220px]">
                    {/* SVG Canvas */}
                    <svg viewBox="0 0 240 180" className="w-full h-auto max-w-[240px]">
                      {/* Grid helper lines */}
                      <line x1="0" y1="45" x2="240" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="90" x2="240" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="135" x2="240" y2="135" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                      {currentQuestion.candles.map((c, i) => {
                        const spacing = 240 / (currentQuestion.candles.length + 1);
                        const cx = spacing * (i + 1);
                        
                        // Scale inputs (invert y values because SVG y increases downwards)
                        const yHigh = 160 - c.high;
                        const yLow = 160 - c.low;
                        const yOpen = 160 - c.open;
                        const yClose = 160 - c.close;
                        
                        const yBody = Math.min(yOpen, yClose);
                        const hBody = Math.max(4, Math.abs(yOpen - yClose));
                        const isGreen = c.color === 'green';
                        const colorHex = isGreen ? '#34D399' : '#F87171';

                        return (
                          <g key={i}>
                            {/* Highlight Box if active */}
                            {c.highlight && (
                              <rect
                                x={cx - 20}
                                y="10"
                                width="40"
                                height="150"
                                rx="8"
                                fill="rgba(91,130,255,0.03)"
                                stroke="rgba(91,130,255,0.2)"
                                strokeWidth="1.5"
                                strokeDasharray="3,3"
                              />
                            )}

                            {/* Candle Wick (line from high to low) */}
                            <line
                              x1={cx}
                              y1={yHigh}
                              x2={cx}
                              y2={yLow}
                              stroke={colorHex}
                              strokeWidth="2"
                              strokeLinecap="round"
                            />

                            {/* Candle Body */}
                            <rect
                              x={cx - 10}
                              y={yBody}
                              width="20"
                              height={hBody}
                              rx="2"
                              fill={colorHex}
                              stroke={colorHex}
                              strokeWidth="1"
                            />
                          </g>
                        );
                      })}
                    </svg>
                    <span className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 flex items-center gap-1.5">
                      <HelpCircle className="h-3 w-3" />
                      Interactive Chart Representation
                    </span>
                  </div>

                  {/* Right Side: Inputs & Explanations */}
                  <div className="md:col-span-7 flex flex-col justify-center">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-electric-400">
                        Pattern {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                      </span>
                      <span className="font-mono text-xs font-semibold text-white/40">
                        Score: {score}/{QUIZ_QUESTIONS.length}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{currentQuestion.name}</h3>
                    <p className="text-sm leading-relaxed text-white/60 mb-6">{currentQuestion.question}</p>

                    <AnimatePresence mode="wait">
                      {!isAnswered ? (
                        <motion.div
                          key="actions"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-4"
                        >
                          <button
                            onClick={() => handleAnswerSubmit('buy')}
                            onMouseEnter={() => setVariant('enroll', 'Buy')}
                            onMouseLeave={() => setVariant('default')}
                            className="flex-1 h-12 rounded-xl font-bold text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-[0.98]"
                          >
                            BUY (Bullish)
                          </button>
                          <button
                            onClick={() => handleAnswerSubmit('sell')}
                            onMouseEnter={() => setVariant('enroll', 'Sell')}
                            onMouseLeave={() => setVariant('default')}
                            className="flex-1 h-12 rounded-xl font-bold text-sm bg-crimson-500/10 border border-crimson-500/20 text-crimson-400 transition-all hover:bg-crimson-500 hover:text-white hover:border-crimson-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] active:scale-[0.98]"
                          >
                            SELL (Bearish)
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="result"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-4"
                        >
                          {/* Answer Badge */}
                          {userAnswer === currentQuestion.correctAnswer ? (
                            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-400">
                              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-sm">Correct Analysis!</p>
                                <p className="mt-1 text-white/70 leading-relaxed">{currentQuestion.explanation}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-2.5 rounded-xl border border-crimson-500/20 bg-crimson-500/5 p-4 text-xs text-crimson-400">
                              <XCircle className="h-5 w-5 text-crimson-400 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-sm">Wrong Bias!</p>
                                <p className="mt-1 text-white/70 leading-relaxed">{currentQuestion.wrongExplanation}</p>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={handleNext}
                            className="h-11 rounded-xl bg-white text-ink-950 font-semibold text-xs transition-colors hover:bg-white/90 self-end px-6 flex items-center gap-1.5 mt-2"
                          >
                            {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Pattern'}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                /* Score Screen */
                <motion.div
                  key="scorecard"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  {/* Circular Score Badge */}
                  <div className="relative h-28 w-28 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-br from-white/[0.04] to-white/[0.01] shadow-2xl">
                    {/* Ring glow */}
                    <div className="absolute inset-0 rounded-full border-2 border-electric-500/40 animate-pulse pointer-events-none" />
                    <span className="font-display text-4xl font-light text-white">
                      {score}<span className="text-white/30 text-2xl">/{QUIZ_QUESTIONS.length}</span>
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">Your Rank:</h3>
                  <div className={`mt-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.2em] ${rankInfo.color}`}>
                    {rankInfo.rank}
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                    {rankInfo.desc}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleReset}
                      className="h-11 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs transition-all px-6 flex items-center justify-center gap-1.5 active:scale-[0.97]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Try Again
                    </button>
                    <a
                      href="#contact"
                      onMouseEnter={() => setVariant('enroll', 'Enroll')}
                      onMouseLeave={() => setVariant('default')}
                      className="h-11 rounded-xl bg-white text-ink-950 font-bold text-xs transition-all hover:bg-white/90 px-6 flex items-center justify-center gap-1.5 active:scale-[0.97] shadow-lg"
                    >
                      Enroll in Mentorship
                      <Play className="h-3.5 w-3.5 text-ink-950 fill-ink-950" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
