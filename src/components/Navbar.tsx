'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import useViewport from '@/hooks/useViewport';
import useTranslation from '@/hooks/useTranslation';
import IconButton from './IconButton';
import { MenuIcon, CloseIcon } from './icons';

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useViewport();
  const { t } = useTranslation();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when viewport changes to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: t('about'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('work'), href: '#works' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center space-x-6">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary py-2 transition-colors duration-200 text-sm"
                >
                  {item.label}
                </a>
              ))}

              <div className="flex items-center ml-2">
                <ThemeToggle />
                <div className="ml-2" />
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <div className="ml-2" />
              <LanguageSwitcher />
              <IconButton
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="ml-1"
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </IconButton>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[250px] bg-background z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <IconButton onClick={toggleMobileMenu} aria-label="Close menu">
              <CloseIcon className="w-5 h-5" />
            </IconButton>
          </div>

          <nav className="py-6">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="block px-6 py-3 text-foreground hover:bg-accent/10 hover:text-primary transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
