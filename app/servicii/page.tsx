"use client";

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, Dumbbell, Apple, Laptop, BarChart } from 'lucide-react';
import Link from 'next/link';


const iconMap = {
  Dumbbell,
  Apple, 
  Laptop,
  BarChart,
};

export default function ServiciiPage() {
  const { t } = useTranslation(['common', 'pages']);

  const SERVICES = [
    {
      id: 'antrenament-personal',
      title: t('common:services.personal.title'),
      description: t('common:services.personal.description'),
      price: t('common:services.personal.price'),
      icon: 'Dumbbell',
      features: t('common:services.personal.features', { returnObjects: true }) as string[],
    },
    {
      id: 'nutritie-personalizata', 
      title: t('common:services.nutrition.title'),
      description: t('common:services.nutrition.description'),
      price: t('common:services.nutrition.price'),
      icon: 'Apple',
      features: t('common:services.nutrition.features', { returnObjects: true }) as string[],
    },
    {
      id: 'antrenament-online',
      title: t('common:services.online.title'),
      description: t('common:services.online.description'),
      price: t('common:services.online.price'),
      icon: 'Laptop',
      features: t('common:services.online.features', { returnObjects: true }) as string[],
    },
    {
      id: 'program-transformare',
      title: t('common:services.transformation.title'),
      description: t('common:services.transformation.description'),
      price: t('common:services.transformation.price'),
      icon: 'BarChart',
      features: t('common:services.transformation.features', { returnObjects: true }) as string[],
    },
  ];

  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-accent-100/50 dark:bg-accent-900/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('pages:services.hero.title')} <span className="text-primary-600">{t('pages:services.hero.titleAccent')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('pages:services.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24">
            {SERVICES.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 0 ? "order-2 lg:order-1" : "order-2"}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {service.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        {service.id === 'program-transformare' ? (
                          <>
                            <span className="text-primary-600 mr-1">✓</span>
                            <span>{feature.substring(2)}</span>
                          </>
                        ) : (
                          <>
                            <Check className="h-5 w-5 text-primary-600 mr-3 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                  </div>
                  
                  <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                    <Link href="/contact">
                      {t('common:cta.takeFirstStep')}
                    </Link>
                  </Button>
                </div>
                
                <div className={index % 2 === 0 ? "order-1 lg:order-2" : "order-1"}>
                  <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden">
                    <Image
                      src={service.id === 'antrenament-personal' 
                        ? "https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfwH5T8uVj83wx7T1NoIPQpdnG4mgziA5lyZcq0"
                        : service.id === 'nutritie-personalizata' 
                          ? "https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfwukfgny34gpbFeqNYrtlznvSTDQ1aPcXM8wZh"
                          : service.id === 'antrenament-online'
                            ? "https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfw4cGeVEhDmAkf2QUN3i40Mv5OXy6ejYWgZ7H9"
                           : "https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfwjQaD4uvTYS0eicJdNFm5D9VuqRUE2pCy71ko"}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-100/50 dark:bg-primary-900/10 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('pages:services.cta.title')} <span className="text-primary-600">{t('pages:services.cta.titleAccent')}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('pages:services.cta.subtitle')}
            </p>
            <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
              <Link href="/contact">
                {t('pages:services.cta.button')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}