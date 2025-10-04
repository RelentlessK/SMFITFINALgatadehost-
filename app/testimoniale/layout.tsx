import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimoniale | SMfit',
  description: 'Descoperă poveștile de succes și feedback-ul clienților SMfit care și-au transformat corpul și obiceiurile cu ajutorul programelor noastre.',
  openGraph: {
    title: 'Testimoniale | SMfit',
    description: 'Descoperă poveștile de succes și feedback-ul clienților SMfit.',
    url: 'https://smfit.ro/testimoniale',
  },
};

export default function TestimonialeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}