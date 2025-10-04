"use client";

"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '@/lib/constants';
import { Instagram, Facebook, Send, Mail, Phone, MapPin } from 'lucide-react';
import TikTokIcon from '@/components/ui/TikTokIcon';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t, i18n } = useTranslation('common');

  const NAV_LINKS = [
    { path: '/', title: t('nav.home') },
    { path: '/servicii', title: t('nav.services') },
    { path: '/despre-mine', title: t('nav.about') },
    { path: '/testimoniale', title: t('nav.testimonials') },
    { path: '/contact', title: t('nav.contact') },
  ];

  const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/sabina.meruta/',
    facebook: 'https://www.facebook.com/sabina.meruta?locale=ro_RO',
    tiktok: 'https://www.tiktok.com/@sabinameruta',
  };

  const CONTACT_INFO = {
    email: 'sabinaantrenor@gmail.com',
    phone: '0787 333 500',
    address: 'B-dul 1 Decembrie 1918, nr. 291, Centrul Comercial Auchan, Tîrgu Mureș, România',
  };

  // Helper function to get localized legal page paths
  const getLegalPagePath = (page: 'terms' | 'cookie') => {
    const isRomanian = i18n.language === 'ro';
    if (page === 'terms') {
      return isRomanian ? '/ro/termeni-si-conditii' : '/terms-and-conditions';
    }
    return isRomanian ? '/ro/politica-cookie' : '/cookie-policy';
  };
  return (
    <footer className="bg-accent-100 dark:bg-accent-900 pt-12 pb-6 text-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-16 w-[180px] mb-1">
                <Image 
                  src="https://uyy0kjad2n.ufs.sh/f/qhW01JguYVfw7IOvbpN0J62eowUxLNWCEqFd8DsRkfZznI4u" 
                  alt="SMfit Logo" 
                  fill
                  sizes="180px"
                  className="object-contain object-left"
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary-600 transition">
                <Instagram size={20} />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary-600 transition">
                <Facebook size={20} />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary-600 transition">
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm text-muted-foreground hover:text-primary-600 transition">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-4">{t('footer.legalPolicies')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={getLegalPagePath('terms')} className="text-sm text-muted-foreground hover:text-primary-600 transition">
                  {t('footer.termsAndConditions')}
                </Link>
              </li>
              <li>
                <Link href={getLegalPagePath('cookie')} className="text-sm text-muted-foreground hover:text-primary-600 transition">
                  {t('footer.cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground hover:text-primary-600 transition">
                    {CONTACT_INFO.email}
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground hover:text-primary-600 transition">
                    {CONTACT_INFO.phone}
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary-600" />
                </div>
                <div>
                  <a 
                    href="https://www.google.com/maps/place/18+Gym+Auchan+Tudor-Targu+Mures/@46.5309835,24.5979599,17z/data=!3m1!4b1!4m6!3m5!1s0x474bb7b43baa946d:0xd452015a86f12cd7!8m2!3d46.5309835!4d24.5979599!16s%2Fg%2F11y3kdp8qy?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary-600 transition"
                  >
                    {CONTACT_INFO.address}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex justify-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SMfit. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;