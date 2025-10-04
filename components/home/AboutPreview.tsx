"use client";

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';

const AboutPreview = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('about.title')} <span className="text-primary-600">{t('about.titleName')}</span>
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('about.greeting')} {t('about.intro1')}
            </p>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('about.intro2')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-accent-100 dark:bg-accent-900/50 p-4 rounded-lg">
                <div className="font-bold text-xl mb-1">3+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.certifications')}</div>
              </div>
              <div className="bg-accent-100 dark:bg-accent-900/50 p-4 rounded-lg">
                <div className="font-bold text-xl mb-1">2+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.experience')}</div>
              </div>
              <div className="bg-accent-100 dark:bg-accent-900/50 p-4 rounded-lg">
                <div className="font-bold text-xl mb-1">100+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.clients')}</div>
              </div>
              <div className="bg-accent-100 dark:bg-accent-900/50 p-4 rounded-lg">
                <div className="font-bold text-xl mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.workouts')}</div>
              </div>
            </div>
            
            <Button asChild className="group">
              <Link href="/despre-mine" className="flex items-center">
                {t('about.learnMore')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
          
          <AnimatedSection direction="left" className="order-1 lg:order-2">
            <div className="relative h-auto flex justify-center rounded-lg overflow-hidden">
              <img
                src="https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfwlpGEGOr0U4wJzZO5AosvteNcyrn6P37uxqjM"
                alt={t('about.trainerImageAlt')}
                className="rounded-lg max-w-full h-auto max-h-[600px] object-contain"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;