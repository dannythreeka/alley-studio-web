'use client';

import { FC, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageProvider';
import IconButton from './IconButton';
import { LanguageIcon } from './icons';
import { Menu, MenuItem } from './navigation/Menu';

type LanguageCode = 'zh-TW' | 'en' | 'ja';

const languages = [
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const LanguageSwitcher: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  // Always call the hook, never conditionally
  const { language, setLanguage } = useLanguage();

  // Set mounted state once component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the full component on client-side
  if (!mounted) {
    return (
      <IconButton aria-label="選擇語言" className="ml-1 opacity-50" disabled>
        <LanguageIcon className="w-5 h-5" />
      </IconButton>
    );
  }

  const handleMenuOpen = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const switchLanguage = (langCode: string) => {
    setLanguage(langCode as LanguageCode);
    handleMenuClose();
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        aria-label="Switch language"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        aria-controls={Boolean(anchorEl) ? 'language-menu' : undefined}
        className="ml-1 border border-accent/30 hover:border-primary/50"
      >
        <LanguageIcon className="w-5 h-5" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {languages.map(lang => (
          <MenuItem key={lang.code} onClick={() => switchLanguage(lang.code)}>
            <div className="flex items-center">
              <span className="mr-2">{lang.flag}</span>
              <span
                className={`${
                  language === lang.code ? 'font-medium text-primary' : ''
                }`}
              >
                {lang.name}
              </span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
