"use client";

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { motion } from 'framer-motion';

const CtaSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-16 md:py-20 hero-gradient overflow-hidden relative">
      <div className="absolute inset-0 opacity-80 z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {t('cta.title')} <span className="text-primary-600">{t('cta.titleAccent')}</span> {t('cta.titleSuffix')}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
            >
              {t('cta.subtitle')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                <Link href="/contact">
                  {t('cta.primaryButton')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/servicii">
                  {t('cta.secondaryButton')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CtaSection;