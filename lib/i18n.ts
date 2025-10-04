'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonEn from '../public/locales/en/common.json';
import commonRo from '../public/locales/ro/common.json';
import pagesEn from '../public/locales/en/pages.json';
import pagesRo from '../public/locales/ro/pages.json';
import faqEn from '../public/locales/en/faq.json';
import faqRo from '../public/locales/ro/faq.json';

export const resources = {
  en: {
    common: commonEn,
    pages: pagesEn,
    faq: faqEn,
  },
  ro: {
    common: commonRo,
    pages: pagesRo,
    faq: faqRo,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ro', // Changed default to Romanian as per project context
    defaultNS: 'common',
    ns: ['common', 'pages', 'faq'],
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;