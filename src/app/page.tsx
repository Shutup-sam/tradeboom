import { Navigation } from '@/sections/navigation/navigation';
import { LiveMarketRibbon } from '@/sections/market-ribbon/live-market-ribbon';
import { Footer } from '@/sections/footer/footer';
import { Hero } from '@/sections/hero/hero';
import { WelcomeSection } from '@/sections/about/welcome';
import { AboutSection } from '@/sections/about/about';
import { CoursesSection } from '@/sections/courses/courses';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ResultsSection } from '@/sections/results/results';
import { MentorshipSection } from '@/sections/mentorship/mentorship';
import { CommunitySection } from '@/sections/community/community';
import { ResourcesSection } from '@/sections/resources/resources';
import { BlogSection } from '@/sections/blog/blog';
import { FAQSection } from '@/sections/faq/faq';
import { ContactSection } from '@/sections/contact/contact';
import { DisclaimerSection } from '@/sections/disclaimer/disclaimer';
import dynamic from 'next/dynamic';

// Lazy-load heavy below-the-fold components to reduce initial JS bundle
const RiskCalculator = dynamic(
  () => import('@/sections/trading-calculator/risk-calculator').then(m => ({ default: m.RiskCalculator })),
  {
    loading: () => (
      <div className="h-[480px] w-full animate-pulse rounded-3xl bg-white/[0.03] border border-white/[0.06]" />
    ),
  }
);

const CandlestickQuiz = dynamic(
  () => import('@/sections/trading-calculator/candlestick-quiz').then(m => ({ default: m.CandlestickQuiz })),
  {
    loading: () => (
      <div className="h-[520px] w-full animate-pulse rounded-3xl bg-white/[0.03] border border-white/[0.06]" />
    ),
  }
);

export default function Home() {
  return (
    <main id="main" className="relative pt-[calc(92px+env(safe-area-inset-top,0px))] sm:pt-0">
      <LiveMarketRibbon />
      <Navigation />

      <Hero />
      <WelcomeSection />
      <AboutSection />
      <CoursesSection />
      <ErrorBoundary>
        <RiskCalculator />
      </ErrorBoundary>
      <ErrorBoundary>
        <CandlestickQuiz />
      </ErrorBoundary>
      <ResultsSection />
      <MentorshipSection />
      <CommunitySection />
      <ResourcesSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />

      <div id="disclaimer">
        <DisclaimerSection />
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Course',
              'name': 'Beginner Trading Foundation',
              'description': 'Learn market structure, technical analysis, charting, risk management, and the psychology of trading from first principles.',
              'provider': {
                '@type': 'Organization',
                'name': 'Trade Boom',
                'sameAs': 'https://www.tradeboom.in',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              'name': 'Trade Boom',
              'url': 'https://www.tradeboom.in',
              'logo': 'https://www.tradeboom.in/logo.svg',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'C-609, 6th Floor, Spectrum Mall, Noida Sector 75',
                'addressLocality': 'Noida',
                'addressRegion': 'Uttar Pradesh',
                'postalCode': '201301',
                'addressCountry': 'IN',
              },
              'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+91-87965-10028',
                'contactType': 'customer support',
                'email': 'tradeboom.vda@gmail.com',
              },
            },
          ]),
        }}
      />
    </main>
  );
}
