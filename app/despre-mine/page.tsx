"use client";

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PhotoCarousel from '@/components/shared/PhotoCarousel';

export default function DespreMine() {
  const { t } = useTranslation(['common', 'pages']);

  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-accent-100/50 dark:bg-accent-900/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('common:about.title')} <span className="text-primary-600">{t('common:about.titleName')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('common:about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t('common:about.whoAmI')}<span className="text-primary-600">{t('common:about.whoAmIAccent')}</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('common:about.greeting')} {t('pages:about.mainContent.intro1')}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('pages:about.mainContent.intro2')}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('pages:about.mainContent.intro3')}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed pt-4">
                {t('pages:about.mainContent.intro4')}
              </p>
            </div>
            <div className="relative h-auto flex justify-center rounded-lg overflow-hidden">
              <img
                src="https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrz1fnyBrRYldrzIivN7xYcX6jQtJ8ybZFBS9Hn"
                alt={t('common:about.trainerImageAlt')}
                className="rounded-lg max-w-full h-auto max-h-[600px] object-contain"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('common:about.philosophy').split(' ')[0]} <span className="text-primary-600">{t('common:about.philosophy').split(' ')[1]}</span></h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('common:about.philosophyIntro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-primary-200 dark:border-primary-900/30 p-6 rounded-lg shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:border-primary-400 dark:hover:border-primary-700 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('common:about.principles.personalization.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common:about.principles.personalization.description')}
                </p>
              </div>
              <div className="bg-card border border-primary-200 dark:border-primary-900/30 p-6 rounded-lg shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:border-primary-400 dark:hover:border-primary-700 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('common:about.principles.scientific.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common:about.principles.scientific.description')}
                </p>
              </div>
              <div className="bg-card border border-primary-200 dark:border-primary-900/30 p-6 rounded-lg shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:border-primary-400 dark:hover:border-primary-700 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('common:about.principles.sustainability.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common:about.principles.sustainability.description')}
                </p>
              </div>
              <div className="bg-card border border-primary-200 dark:border-primary-900/30 p-6 rounded-lg shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:border-primary-400 dark:hover:border-primary-700 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('common:about.principles.education.title')}</h3>
                <p className="text-muted-foreground">
                  {t('common:about.principles.education.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Photo Carousel Section */}
          <PhotoCarousel />

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('pages:about.certifications.title').split(' ')[0]} <span className="text-primary-600">{t('pages:about.certifications.title').split(' ').slice(1).join(' ')}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card border border-primary-200 dark:border-primary-900/30 p-6 rounded-lg shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:border-primary-400 dark:hover:border-primary-700 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('pages:about.certifications.formal.title')}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {(t('pages:about.certifications.formal.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-primary-200 dark:border-primary-900/30 p-6 rounded-lg shadow-md transition-all duration-300 hover:transform hover:scale-105 hover:border-primary-400 dark:hover:border-primary-700 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('pages:about.certifications.international.title')}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {(t('pages:about.certifications.international.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Partners Section */}
            <section id="partners" className="py-12 px-6 lg:px-12 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">{t('pages:about.partners.title').split(' ')[0]} <span className="text-primary-600">{t('pages:about.partners.title').split(' ')[1]}</span></h2>
              <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                <Link 
                  href="https://scitec.ro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-gradient-to-br from-[#f7cfd8]/50 to-[#ffe3e8]/50 hover:from-[#f7cfd8]/60 hover:to-[#ffe3e8]/60 border border-primary-200 rounded-lg shadow-sm p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h4 className="text-xl font-semibold mb-3 text-center">Scitec Nutrition</h4>
                    <p className="text-muted-foreground mb-4 text-center">
                      {t('pages:about.partners.scitec.description')}
                    </p>
                    <p className="text-sm font-medium text-primary-600 mb-4 text-center">{t('pages:about.partners.scitec.promoCode')}</p>
                    <div className="text-center">
                      <button className="inline-block bg-primary-500 text-white rounded-full py-2 px-4 hover:bg-primary-600 transition" aria-label={t('pages:about.partners.scitec.button')}>
                        {t('pages:about.partners.scitec.button')}
                      </button>
                    </div>
                  </div>
                </Link>

                <Link 
                  href="https://gymhyper.ro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-gradient-to-br from-[#f7cfd8]/50 to-[#ffe3e8]/50 hover:from-[#f7cfd8]/60 hover:to-[#ffe3e8]/60 border border-primary-200 rounded-lg shadow-sm p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h4 className="text-xl font-semibold mb-3 text-center">GymHyper</h4>
                    <p className="text-muted-foreground mb-4 text-center">
                      {t('pages:about.partners.gymhyper.description')}
                    </p>
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-primary-600">{t('pages:about.partners.gymhyper.promoCode')}</p>
                    </div>
                    <div className="text-center">
                      <button className="inline-block bg-primary-500 text-white rounded-full py-2 px-4 hover:bg-primary-600 transition" aria-label={t('pages:about.partners.gymhyper.button')}>
                        {t('pages:about.partners.gymhyper.button')}
                      </button>
                    </div>
                  </div>
                </Link>

                <Link 
                  href="https://cocosolis.com/ro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-gradient-to-br from-[#f7cfd8]/50 to-[#ffe3e8]/50 hover:from-[#f7cfd8]/60 hover:to-[#ffe3e8]/60 border border-primary-200 rounded-lg shadow-sm p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h4 className="text-xl font-semibold mb-3 text-center">Cocosolis</h4>
                    <p className="text-muted-foreground mb-4 text-center">
                      {t('pages:about.partners.cocosolis.description')}
                    </p>
                    <p className="text-sm font-medium text-primary-600 mb-4 text-center">{t('pages:about.partners.cocosolis.promoCode')}</p>
                    <div className="text-center">
                      <button className="inline-block bg-primary-500 text-white rounded-full py-2 px-4 hover:bg-primary-600 transition" aria-label={t('pages:about.partners.cocosolis.button')}>
                        {t('pages:about.partners.cocosolis.button')}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            <div className="text-center">
              <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                <Link href="/contact" className="flex items-center">
                  {t('pages:about.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}