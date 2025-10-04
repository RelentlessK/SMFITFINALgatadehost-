import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politică Cookie-uri — SMfit',
  description: 'Informații cookie-uri site SMfit: funcționare, control și confidențialitate. Ghid complet pentru utilizatori.',
  alternates: {
    canonical: 'https://smfit.ro/ro/politica-cookie',
    languages: {
      'en': 'https://smfit.ro/cookie-policy',
      'ro': 'https://smfit.ro/ro/politica-cookie',
    },
  },
  openGraph: {
    title: 'Politică Cookie-uri — SMfit',
    description: 'Informații cookie-uri site SMfit: funcționare, control și confidențialitate. Ghid complet pentru utilizatori.',
    url: 'https://smfit.ro/ro/politica-cookie',
  },
};

export default function PoliticaCookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}