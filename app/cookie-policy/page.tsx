'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Cookie, Info, HelpCircle, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

export default function CookiePolicyPage() {
  const { t } = useTranslation(['common', 'pages']);

  const sections = [
    {
      id: 'what-is-a-cookie', 
      title: t('pages:cookie.sections.whatIsCookie.title'),
      label: t('pages:cookie.sections.whatIsCookie.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.whatIsCookie.content')}
          </p>
        </>
      ),
    },
    {
      id: 'cookie-functionality',
      title: t('pages:cookie.sections.cookieFunctionality.title'),
      label: t('pages:cookie.sections.cookieFunctionality.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.cookieFunctionality.content1')}
          </p>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.cookieFunctionality.content2')}
          </p>
        </>
      ),
    },
    {
      id: 'additional-cookies-notice',
      title: t('pages:cookie.sections.additionalCookies.title'),
      label: t('pages:cookie.sections.additionalCookies.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.additionalCookies.content')}
          </p>
        </>
      ),
    },
    {
      id: 'how-do-cookies-work',
      title: t('pages:cookie.sections.howCookiesWork.title'),
      label: t('pages:cookie.sections.howCookiesWork.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.howCookiesWork.content1')}
          </p>
          <ul className="list-none space-y-2 mb-4">
            {(t('pages:cookie.sections.howCookiesWork.features', { returnObjects: true }) as string[]).map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-600 mr-2 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.howCookiesWork.content2')}
          </p>
        </>
      ),
    },
    {
      id: 'personal-data-security',
      title: t('pages:cookie.sections.personalDataSecurity.title'),
      label: t('pages:cookie.sections.personalDataSecurity.label'),
      content: (
        <>
          <p className="text-muted-foreground mb-4">
            {t('pages:cookie.sections.personalDataSecurity.content')}
          </p>
        </>
      ),
    },
  ];

  const faqItems = [
    {
      question: t('pages:cookie.faq.whatIsCookie'),
      answer: t('pages:cookie.faq.whatIsCookieAnswer'),
      link: t('pages:cookie.faq.whatIsCookieLink'),
    },
    {
      question: t('pages:cookie.faq.disableCookies'),
      answer: t('pages:cookie.faq.disableCookiesAnswer'),
      link: t('pages:cookie.faq.disableCookiesLink'),
    },
    {
      question: t('pages:cookie.faq.privacyImpact'),
      answer: t('pages:cookie.faq.privacyImpactAnswer'),
      link: t('pages:cookie.faq.privacyImpactLink'),
    },
  ];

  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-accent-100/50 dark:bg-accent-900/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('pages:cookie.hero.title')} <span className="text-primary-600">{t('pages:cookie.hero.titleAccent')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('pages:cookie.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Cookie Control Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary-100/20 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700/30 rounded-lg p-6 mb-12 flex items-start space-x-4"
            >
              <Cookie className="h-8 w-8 text-primary-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-primary-600 mb-2">{t('pages:cookie.cookieControl.title')}</h2>
                <p className="text-muted-foreground mb-3">
                  {t('pages:cookie.cookieControl.description')}{' '}
                  <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">
                    {t('pages:cookie.cookieControl.aboutCookiesLink')}
                  </a>
                  .
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('pages:cookie.cookieControl.note')}
                </p>
              </div>
            </motion.div>

            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6 mb-12 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">{t('pages:cookie.tableOfContents')}</h2>
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

            {/* FAQ Section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase mr-3">
                  {t('pages:cookie.faq.label')}
                </span>
                <h2 className="text-3xl font-bold">{t('pages:cookie.faq.title')}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full bg-accent-100/50 dark:bg-accent-900/20 p-6 rounded-lg">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-2">{item.answer}</p>
                      <Link href={item.link} className="text-primary-600 hover:underline flex items-center text-sm">
                        {t('pages:cookie.faq.readMore')} <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Useful Resources */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase mr-3">
                  {t('pages:cookie.usefulResources.label')}
                </span>
                <h2 className="text-3xl font-bold">{t('pages:cookie.usefulResources.title')}</h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 bg-accent-100/50 dark:bg-accent-900/20 p-6 rounded-lg">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a
                    href="https://www.cookiebot.com/en/tracking-cookies/?utm_source=google&utm_medium=cpc&utm_term=&utm_campaign=cb_dm_ww_eng_dsa_search&utm_ad_group=ww-en-blog-en&gad_source=1&gad_campaignid=20754896841&gbraid=0AAAAABYXPmXIv0THTFiLfiR8TtiJHs6TG&gclid=CjwKCAjwlt7GBhAvEiwAKal0ci22tLLjA2QJdKDfKie8VevdTVsI4Ze4ffpsIvC3ZVfJFenUG3UuPhoC63sQAvD_BwE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {t('pages:cookie.usefulResources.allAboutCookies')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a
                    href="https://www.youronlinechoices.com/uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {t('pages:cookie.usefulResources.yourOnlineChoices')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}