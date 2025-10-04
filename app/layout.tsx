import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import VortexEffect from '@/components/shared/VortexEffect';
import FitnessIconSystem from '@/components/shared/FitnessIconSystem';
import InstagramIcon from '@/components/ui/InstagramIcon';
import I18nProvider from '@/components/providers/I18nProvider';
import ChatAgent from '@/components/shared/ChatAgent';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'SMfit - Antrenamente Personalizate & Nutriție',
    template: '%s | SMfit',
  },
  description: 'Transformă-ți corpul cu SMfit: antrenamente personalizate online sau live și planuri nutriționale adaptate nevoilor tale.',
  metadataBase: new URL('https://smfit.ro'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://smfit.ro',
    title: 'SMfit - Antrenamente Personalizate & Nutriție',
    description: 'Transformă-ți corpul cu SMfit: antrenamente personalizate online sau live și planuri nutriționale adaptate nevoilor tale.',
    siteName: 'SMfit',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <Header />
              <main className="flex-grow relative">
                {children}
              </main>
              <Footer />
              <Toaster />
              <Analytics />
              <VortexEffect excludeHomepageHero={true} />
              <FitnessIconSystem />
              <InstagramIcon />
              <ChatAgent />
            </ThemeProvider>
          </I18nProvider>
        </Suspense>
      </body>
    </html>
  );
}