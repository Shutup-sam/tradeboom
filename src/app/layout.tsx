import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { CursorProvider } from '@/components/providers/cursor-provider';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tradeboom.in'),
  title: {
    default: 'Trade Boom — Master the Markets with Confidence | Ankit Kumar & Rishav Kumar',
    template: '%s | Trade Boom',
  },
  description:
    'Trade Boom by Ankit Kumar and Rishav Kumar — premium trading education, structured mentorship, and a thriving community of disciplined traders. Build real skill, not shortcuts.',
  keywords: [
    'trading education',
    'stock market courses',
    'Ankit Kumar',
    'Rishav Kumar',
    'Trade Boom',
    'price action course',
    'intraday trading',
    'options trading course',
    'swing trading',
    'forex trading',
    'crypto trading',
    'trading mentorship',
    'trading psychology',
  ],
  authors: [{ name: 'Ankit Kumar' }, { name: 'Rishav Kumar' }],
  creator: 'Trade Boom',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tradeboom.in',
    siteName: 'Trade Boom',
    title: 'Trade Boom — Master the Markets with Confidence',
    description:
      'Premium trading education by Ankit Kumar and Rishav Kumar. Structured courses, personal mentorship, and a community of disciplined traders.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Trade Boom — Master the Markets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trade Boom — Master the Markets with Confidence',
    description: 'Premium trading education, mentorship, and community by Ankit Kumar and Rishav Kumar.',
    creator: '@tradeboom',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050507',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink-950 text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-electric-500 focus:text-white focus:rounded-md"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <CursorProvider>
            <ScrollProgress />
            <CustomCursor />
            {children}
            <WhatsAppFloat />
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
