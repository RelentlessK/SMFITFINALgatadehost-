"use client";

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/shared/AnimatedSection';

const TestimonialsSlider = () => {
  const { t } = useTranslation('common');

  // Get testimonials from translations with fallback images
  const TESTIMONIALS = (t('testimonials.items', { returnObjects: true }) as Array<{
    name: string;
    content: string;
    image: string;
  }>);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 md:py-24 bg-primary-100/50 dark:bg-primary-900/10">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('testimonials.title')} <span className="text-primary-600">{t('testimonials.titleAccent')}</span> {t('testimonials.titleSuffix')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('testimonials.subtitle')}
          </p>
        </AnimatedSection>
        
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-card border border-border p-8 rounded-xl shadow-md"
            >
              <Quote className="h-10 w-10 text-primary-400 mb-6" />
              
              <p className="text-lg md:text-xl mb-8 italic leading-relaxed">
                "{TESTIMONIALS[currentIndex].content}"
              </p>
              
              <div className="flex items-center">
                <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={TESTIMONIALS[currentIndex].image} 
                    alt={TESTIMONIALS[currentIndex].name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{TESTIMONIALS[currentIndex].name}</h4>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  currentIndex === index ? "bg-primary-500 w-8" : "bg-primary-200"
                )}
                onClick={() => {
                  setIsAutoplay(false);
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 bg-card border border-border rounded-full p-2 shadow-md hover:bg-accent-100 transition-colors text-foreground"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 bg-card border border-border rounded-full p-2 shadow-md hover:bg-accent-100 transition-colors text-foreground"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;