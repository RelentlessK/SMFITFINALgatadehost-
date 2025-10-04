"use client";

import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from '@/components/shared/AnimatedSection';

const FaqSection = () => {
  const { t } = useTranslation(['common', 'faq']);

  const FAQ_ITEMS = t('faq:items', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('faq.title')} <span className="text-primary-600">{t('faq.titleAccent')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('faq.subtitle')}
          </p>
        </AnimatedSection>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;