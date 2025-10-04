"use client";

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Dumbbell, Apple, Laptop, BarChart } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

const ServicesOverview = () => {
  const { t } = useTranslation('common');

  const iconMap = {
    Dumbbell: Dumbbell,
    Apple: Apple,
    Laptop: Laptop,
    BarChart: BarChart,
  };

  const SERVICES = [
    {
      id: 'antrenament-personal',
      title: t('services.personal.title'),
      description: t('services.personal.description'),
      price: t('services.personal.price'),
      icon: 'Dumbbell',
      features: t('services.personal.features', { returnObjects: true }) as string[],
    },
    {
      id: 'nutritie-personalizata',
      title: t('services.nutrition.title'),
      description: t('services.nutrition.description'),
      price: t('services.nutrition.price'),
      icon: 'Apple',
      features: t('services.nutrition.features', { returnObjects: true }) as string[],
    },
    {
      id: 'antrenament-online',
      title: t('services.online.title'),
      description: t('services.online.description'),
      price: t('services.online.price'),
      icon: 'Laptop',
      features: t('services.online.features', { returnObjects: true }) as string[],
    },
    {
      id: 'program-transformare',
      title: t('services.transformation.title'),
      description: t('services.transformation.description'),
      price: t('services.transformation.price'),
      icon: 'BarChart',
      features: t('services.transformation.features', { returnObjects: true }) as string[],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-accent-100/50 dark:bg-accent-900/20">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('services.title')} <span className="text-primary-600">{t('services.titleAccent')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('services.subtitle')}
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <AnimatedSection
                key={service.id}
                delay={index * 0.1}
                className={cn(
                  "bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow",
                  "border border-border flex flex-col h-full"
                )}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <div className="h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 transition-transform duration-300 hover:transform hover:scale-110">
                    {IconComponent && <IconComponent className="h-6 w-6 text-primary-600" />}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm flex-grow">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary-600 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <div className="text-lg font-bold mb-4 text-primary-600">{service.price}</div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/servicii#${service.id}`} className="flex items-center justify-center">
                        {t('services.learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;