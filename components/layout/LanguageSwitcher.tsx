'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language preference
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ro')) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ro' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('i18nextLng', newLanguage);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-all hover:bg-primary-100 dark:hover:bg-primary-900/30",
        className
      )}
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="uppercase font-semibold">
        {i18n.language === 'en' ? 'RO' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;