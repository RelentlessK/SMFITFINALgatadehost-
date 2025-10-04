"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import MobileNav from './MobileNav';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { t } = useTranslation('common');

  const NAV_LINKS = [
    { path: '/', title: t('nav.home') },
    { path: '/servicii', title: t('nav.services') },
    { path: '/despre-mine', title: t('nav.about') },
    { path: '/testimoniale', title: t('nav.testimonials') },
    { path: '/contact', title: t('nav.contact') },
  ];

  // Check if header should be transparent (homepage + not scrolled)
  const isTransparent = pathname === '/' && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Event listener for closing the mobile menu
    const closeMobileMenu = () => setIsOpen(false);
    document.addEventListener('close-mobile-menu', closeMobileMenu);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('close-mobile-menu', closeMobileMenu);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  // Toggle body scroll when mobile menu is open/closed
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Check if the current path matches or starts with the nav link path
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300 bg-white py-2',
      isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'
    )}>
      <div className="container mx-auto px-0 md:px-2 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50 ml-0 mr-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-20 w-[220px] pl-0"
          >
            <Image 
              src="https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfw7IOvbpN0J62eowUxLNWCEqFd8DsRkfZznI4u" 
              alt="SMfit Logo" 
              fill
              sizes="(max-width: 768px) 220px, 220px"
              className="object-contain object-left"
              style={{ backgroundColor: 'transparent' }}
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={cn(
                    'text-base font-medium transition-all duration-300 font-heading', 
                    isActive(link.path)
                      ? (isTransparent ? 'text-white border-b-2 border-white' : 'text-primary-300 border-b-2 border-primary-400')
                      : (isTransparent ? 'text-white hover:text-primary-300' : 'text-foreground/80 hover:text-primary-300')
                  )}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher className={cn(
            isTransparent ? "text-white hover:bg-white/10" : "text-foreground"
          )} />
          <Button asChild size="sm" className={cn(
            "min-w-[140px]",
            isTransparent 
              ? "bg-white/20 text-white hover:bg-white/30" 
              : "bg-primary-500 hover:bg-primary-600 text-white"
          )}>
            <Link href="/contact">
              {t('nav.contactButton')}
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "z-50 focus:outline-none p-2",
              isTransparent ? "text-white" : "text-foreground"
            )}
            aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && <MobileNav />}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;