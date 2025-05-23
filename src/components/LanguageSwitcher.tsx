'use client';

import { FC, useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguage } from '@/context/LanguageProvider';

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
      <IconButton
        color="primary"
        aria-label="選擇語言"
        sx={{ ml: 1, opacity: 0.5 }}
        disabled
      >
        <LanguageIcon />
      </IconButton>
    );
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
        color="primary"
        aria-label="Switch language"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        aria-controls={Boolean(anchorEl) ? 'language-menu' : undefined}
        title="Switch language"
        sx={{
          ml: 1,
          bgcolor: anchorEl ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'language-switch-button',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            selected={language === lang.code}
            sx={{
              minWidth: '120px',
              fontWeight: language === lang.code ? 'bold' : 'normal',
            }}
          >
            <span style={{ marginRight: '8px' }}>{lang.flag}</span>
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
