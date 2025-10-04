"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const MobileNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  const NAV_LINKS = [
    { path: '/', title: t('nav.home') },
    { path: '/servicii', title: t('nav.services') },
    { path: '/despre-mine', title: t('nav.about') },
    { path: '/testimoniale', title: t('nav.testimonials') },
    { path: '/contact', title: t('nav.contact') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Check if the current path matches or starts with the nav link path
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Disable background scrolling when the menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div id="mobile-menu-overlay">
      <button
        className="close-btn"
        onClick={() => document.dispatchEvent(new CustomEvent('close-mobile-menu'))}
        aria-label="Close menu"
      >
        <X />
      </button>
      
      <motion.ul 
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="flex flex-col space-y-8 items-center text-lg mt-12 w-full"
      >
        {NAV_LINKS.map((link) => (
          <motion.li key={link.path} variants={itemVariants} className="w-full">
            <Link
              href={link.path}
              className={cn(
                'font-medium transition-all duration-300 hover:text-primary-600 block text-center py-2 px-4 w-full',
                isActive(link.path) 
                  ? 'text-[#FF69B4] border-b-2 border-[#FF69B4] pb-1'
                  : 'text-foreground/80'
              )}
              onClick={() => document.dispatchEvent(new CustomEvent('close-mobile-menu'))}
            >
              {link.title}
            </Link>
          </motion.li>
        ))}
        <motion.li variants={itemVariants} className="w-full pt-2">
          <LanguageSwitcher className="w-full justify-center py-3" />
        </motion.li>
        <motion.li variants={itemVariants} className="w-full pt-4">
          <Button asChild className="bg-primary-500 hover:bg-primary-600 text-white w-full min-h-[48px] px-6">
            <Link href="/contact" onClick={() => document.dispatchEvent(new CustomEvent('close-mobile-menu'))}>
              {t('nav.contactButton')}
            </Link>
          </Button>
        </motion.li>
      </motion.ul>
    </div>
  );
};

export default MobileNav;