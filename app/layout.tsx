import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CursorProvider } from '@/components/motion/AnimatedCursor';
import { PageTransition } from '@/components/motion/PageTransition';

const geistSans = Geist({ variable: '--font-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
const playfair = Playfair_Display({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Griffin Mayer',
  description:
    'Finance student at Dalhousie University — wealth management, business analysis, and investment research.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--base)] text-[var(--text)] antialiased">
        <CursorProvider>
          <PageTransition>{children}</PageTransition>
          <div
            aria-hidden
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              opacity: 0.04,
            }}
          />
        </CursorProvider>
      </body>
    </html>
  );
}
