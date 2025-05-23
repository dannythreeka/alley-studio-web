'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import useViewport from '@/hooks/useViewport';
import useTranslation from '@/hooks/useTranslation';

// Hide AppBar on scroll
function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useViewport();

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

  // Close mobile menu on escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close mobile menu when viewport changes to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const { t } = useTranslation();

  const navLinks = [
    { name: t('about'), href: '#about' },
    { name: t('services'), href: '#services' },
    { name: t('work'), href: '#works' },
    { name: t('contact'), href: '#contact' },
  ];

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={isScrolled ? 2 : 0}
          sx={{
            bgcolor: isScrolled ? 'background.default' : 'transparent',
            backdropFilter: isScrolled ? 'blur(8px)' : 'none',
            py: isScrolled ? 0 : { xs: 0.5, md: 1 },
            transition: 'all 0.3s',
            boxShadow: isScrolled ? 1 : 0,
          }}
        >
          <Container>
            <Toolbar
              disableGutters
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <a href="#" style={{ display: 'block' }}>
                  <Logo />
                </a>
              </motion.div>

              {/* Desktop Menu */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {navLinks.map((link, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }}>
                    <Button
                      href={link.href}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'transparent',
                          borderBottomColor: 'primary.main',
                          borderBottomStyle: 'solid',
                          borderBottomWidth: '2px',
                        },
                        textTransform: 'none',
                        fontSize: '1rem',
                        pb: 0.5,
                      }}
                    >
                      {link.name}
                    </Button>
                  </motion.div>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageSwitcher />
                  <ThemeToggle />
                </Box>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                sx={{ display: { md: 'none' } }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu */}
      <Drawer
        anchor="top"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            height: '100%',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <List sx={{ width: '100%', textAlign: 'center' }}>
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <ListItem
                  sx={{
                    justifyContent: 'center',
                    py: 2,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    href={link.href}
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <ListItemText primary={link.name} />
                  </Button>
                </ListItem>
              </motion.div>
            ))}
          </List>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: navLinks.length * 0.1 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <LanguageSwitcher />
              <ThemeToggle />
            </Box>
          </motion.div>
        </Box>
      </Drawer>

      {/* Toolbar to offset content under fixed AppBar */}
      <Toolbar sx={{ mb: { xs: 2, md: 4 } }} />
    </>
  );
};

export default Navbar;
