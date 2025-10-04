"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  name: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

const NavItem = ({ name, url, icon: Icon, isActive }: NavItemProps) => {
  return (
    <Link href={url} className="w-full">
      <div className={cn(
        "flex flex-col items-center justify-center",
        "text-sm font-medium transition-colors",
        isActive ? "text-primary-600" : "text-muted-foreground hover:text-primary-600"
      )}>
        <Icon className="h-5 w-5 mb-1" />
        <span>{name}</span>
      </div>
    </Link>
  );
};

interface NavBarProps {
  items: {
    name: string;
    url: string;
    icon: React.ElementType;
  }[];
}

export function NavBar({ items }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Disable background scrolling when the menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-primary-500 text-white rounded-full shadow-lg"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-50
            bg-white/80 backdrop-blur-md
            flex flex-col p-6
          "
        >
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-foreground"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {items.map((item) => (
              <NavItem
                key={item.url}
                name={item.name}
                url={item.url}
                icon={item.icon}
                isActive={pathname === item.url}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-border p-2">
        <div className="container mx-auto flex items-center justify-center">
          <nav className="flex items-center justify-between w-full max-w-md">
            {items.map((item) => (
              <NavItem
                key={item.url}
                name={item.name}
                url={item.url}
                icon={item.icon}
                isActive={pathname === item.url}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {items.map((item) => (
            <Link 
              key={item.url} 
              href={item.url}
              className="flex flex-col items-center p-2"
              onClick={() => setMobileOpen(false)}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  pathname === item.url ? "text-primary-600" : "text-muted-foreground"
                )} 
              />
              <span 
                className={cn(
                  "text-xs",
                  pathname === item.url ? "text-primary-600" : "text-muted-foreground"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}