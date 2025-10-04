"use client";

"use client";

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator
} from '@/components/ui/carousel';

const images = [
  {
    src: "https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrzwIy7OUjKkTclfebZu6hvgBj5IdXUmYW2yzH8",
    alt: "Sabina Meruță antrenament personal"
  },
  {
    src: "https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrzIHtMnqPdT6jBgrS4sYH1pVnizlaZhcePyuNW",
    alt: "Sabina Meruță demonstrație exerciții"
  },
  {
    src: "https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrzQGGCWfznMFxXfPvS8rT1Wp2z6RLagwsAZj9i",
    alt: "Sabina Meruță în sala de fitness"
  },
  {
    src: "https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrzma61MzukbacUfFlEq5YyrsA1238MGeTndtOj",
    alt: "Antrenament personalizat SMfit"
  },
  {
    src: "https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrzbQyunf3C3LiDGJkOwpnsu4IAva7WXKjfo6mM",
    alt: "Rezultate antrenament SMfit"
  },
  {
    src: "https://zbm5woa3iy.ufs.sh/f/1fxqa6mYldrzPjrqA7WJlKPtwLRayiSTm3GkZY68nbDhACox",
    alt: "Sabina Meruță coaching fitness"
  },
];

const PhotoCarousel = () => {
  const { t } = useTranslation('pages');
  const [isMounted, setIsMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 2500); // 2.5 seconds per slide
    
    return () => clearInterval(interval);
  }, [autoPlay]);

  // Pause auto-slide when user interacts with carousel
  const handleIndexChange = useCallback((newIndex: number) => {
    setIndex(newIndex);
    setAutoPlay(false);
    
    // Resume auto-play after 5 seconds of inactivity
    const timer = setTimeout(() => setAutoPlay(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatedSection className="max-w-4xl mx-auto my-24">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {t('about.photos.title').split(' ')[0]} <span className="text-primary-600">{t('about.photos.title').split(' ').slice(1).join(' ')}</span>
      </h2>
      
      <div className="relative mx-auto">
        <Carousel 
          className="w-full" 
          index={index}
          onIndexChange={handleIndexChange}
        >
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={idx}>
                <div className="flex justify-center p-1">
                  <div className="overflow-hidden rounded-lg border-4 border-primary-200 dark:border-primary-900/30 
                                shadow-[0_0_15px_rgba(247,168,196,0.15)]
                                transition-all duration-300 hover:shadow-[0_0_25px_rgba(247,168,196,0.3)]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-auto max-h-[600px] w-auto mx-auto"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselNavigation 
            alwaysShow 
            classNameButton="bg-white/80 dark:bg-gray-800/80 p-2 hover:bg-white dark:hover:bg-gray-800 shadow-md"
            className="absolute left-[-5%] top-1/2 flex w-[110%] -translate-y-1/2 justify-between px-2"
          />
          
          <CarouselIndicator 
            className="mb-4" 
            classNameButton={cn(
              "h-3 w-3",
              "hover:bg-primary-500"
            )}
          />
        </Carousel>
      </div>
    </AnimatedSection>
  );
};

export default PhotoCarousel;