'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Mail, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

export default function TermeniSiConditiiPage() {
  const { t } = useTranslation(['common', 'pages']);

  const lastUpdatedDate = new Date().toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sections = [
    {
      id: 'acceptare-termeni',
      title: t('pages:terms.sections.acceptanceOfTerms.title'),
      label: t('pages:terms.sections.acceptanceOfTerms.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:terms.sections.acceptanceOfTerms.content')}
          </p>
        </>
      ),
    },
    {
      id: 'utilizarea-site-ului',
      title: t('pages:terms.sections.useOfWebsite.title'),
      label: t('pages:terms.sections.useOfWebsite.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:terms.sections.useOfWebsite.content1')}
          </p>
          <p className="text-muted-foreground mb-4">
            {t('pages:terms.sections.useOfWebsite.content2')}
          </p>
        </>
      ),
    },
    {
      id: 'proprietate-intelectuala',
      title: t('pages:terms.sections.intellectualProperty.title'),
      label: t('pages:terms.sections.intellectualProperty.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:terms.sections.intellectualProperty.content')}
          </p>
        </>
      ),
    },
    {
      id: 'limitarea-raspunderii',
      title: t('pages:terms.sections.limitationOfLiability.title'),
      label: t('pages:terms.sections.limitationOfLiability.label'),
      content: (
        <>
          <div className="bg-primary-100/20 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700/30 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <Info className="h-6 w-6 text-primary-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary-600 mb-2">{t('pages:terms.sections.limitationOfLiability.legalNotice.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('pages:terms.sections.limitationOfLiability.legalNotice.content')}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {t('pages:terms.sections.limitationOfLiability.content')}
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: t('pages:terms.sections.contact.title'),
      label: t('pages:terms.sections.contact.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:terms.sections.contact.content1')}
          </p>
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-5 w-5 text-primary-600 shrink-0" />
            <a href={`mailto:${t('pages:terms.sections.contact.email')}`} className="text-muted-foreground hover:text-primary-600 transition">
              {t('pages:terms.sections.contact.email')}
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            {t('pages:terms.sections.contact.content2')}
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-accent-100/50 dark:bg-accent-900/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Termeni și <span className="text-primary-600">Condiții</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              {t('pages:terms.hero.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('pages:terms.lastUpdated')}: {lastUpdatedDate}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 mb-12 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">{t('pages:terms.tableOfContents')}</h2>
              <ul className="list-none space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="text-muted-foreground hover:text-primary-600 transition-colors text-base"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                <div className="flex items-center mb-4">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase mr-3">
                    {section.label}
                  </span>
                  <h2 className="text-3xl font-bold">{section.title}</h2>
                </div>
                <div className="bg-accent-100/50 dark:bg-accent-900/20 p-6 rounded-lg">
                  {section.content}
                </div>
                {index < sections.length - 1 && <Separator className="my-12" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}