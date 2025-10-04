import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — SMfit',
  description: 'Information about cookies used on the SMfit site, how they work and how to control them.',
  alternates: {
    canonical: 'https://smfit.ro/cookie-policy',
    languages: {
      'en': 'https://smfit.ro/cookie-policy',
      'ro': 'https://smfit.ro/ro/politica-cookie',
    },
  },
  openGraph: {
    title: 'Cookie Policy — SMfit',
    description: 'Information about cookies used on the SMfit site, how they work and how to control them.',
    url: 'https://smfit.ro/cookie-policy',
  },
};

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}