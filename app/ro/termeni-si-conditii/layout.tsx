import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termeni Condiții — SMfit',
  description: 'Termeni utilizare site SMfit: reguli, drepturi, limitări răspundere. Ghid legal complet pentru utilizatori.',
  alternates: {
    canonical: 'https://smfit.ro/ro/termeni-si-conditii',
    languages: {
      'en': 'https://smfit.ro/terms-and-conditions',
      'ro': 'https://smfit.ro/ro/termeni-si-conditii',
    },
  },
  openGraph: {
    title: 'Termeni Condiții — SMfit',
    description: 'Termeni utilizare site SMfit: reguli, drepturi, limitări răspundere. Ghid legal complet pentru utilizatori.',
    url: 'https://smfit.ro/ro/termeni-si-conditii',
  },
};

export default function TermeniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}