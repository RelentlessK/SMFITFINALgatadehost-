"use client";

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Component as LumaSpin } from '@/components/ui/luma-spin';

const VIDEO_URL = "https://vhqd75bvbs.ufs.sh/f/xRpe82xlR4uclILHWMYAo4dNGScRMZe6x8Fv3Os7Pnf2UtVb";

const HeroVideo = () => {
  const { t } = useTranslation('common');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set loading state to false when video can play
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      
      // Ensure video is ready and plays immediately
      video.load(); // Force load
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Video autoplay was prevented:', error);
        }
      };
      
      if (video.readyState >= 3) {
        // Video is already loaded enough to play
        setIsVideoLoaded(true);
        playVideo();
      } else {
        // Wait for video to be ready
        video.addEventListener('canplay', () => {
          setIsVideoLoaded(true);
          playVideo();
        }, { once: true });
      }
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  return (
    <section className="min-h-screen relative w-full flex items-center justify-center overflow-hidden">
      {/* Custom Loading Spinner */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-30 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <LumaSpin />
            <p className="text-pink-200/80 text-sm font-medium tracking-wide">Loading...</p>
          </div>
        </div>
      )}

      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Video background: short clip of the trainer doing exercises"
        style={{ backgroundColor: 'transparent' }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))'
        }}
        aria-hidden="true"
      />

      {/* Text Content */}
      <div 
        className="relative z-20 flex flex-col items-center justify-center text-center text-white p-6 w-full h-full pt-16 sm:pt-0"
        role="region"
        aria-label="Intro"
      >
        <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-primary-300 via-primary-500 to-secondary-400 bg-clip-text text-transparent drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-pink-100 via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-md">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;