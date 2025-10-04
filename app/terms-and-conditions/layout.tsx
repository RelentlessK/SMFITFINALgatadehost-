import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions — SMfit',
  description: 'Terms and conditions of using SMfit website. Read our rules regarding site use, intellectual property and liability.',
  alternates: {
    canonical: 'https://smfit.ro/terms-and-conditions',
    languages: {
      'en': 'https://smfit.ro/terms-and-conditions',
      'ro': 'https://smfit.ro/ro/termeni-si-conditii',
    },
  },
  openGraph: {
    title: 'Terms and Conditions — SMfit',
    description: 'Terms and conditions of using SMfit website. Read our rules regarding site use, intellectual property and liability.',
    url: 'https://smfit.ro/terms-and-conditions',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}