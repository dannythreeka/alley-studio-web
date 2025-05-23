'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeProvider';
import { SunIcon, MoonIcon } from './icons';
import IconButton from './IconButton';

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="ml-1 border border-accent/30 hover:border-accent/50"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{
          duration: 0.3,
          type: 'tween',
        }}
        className="flex"
      >
        {theme === 'light' ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </motion.div>
    </IconButton>
  );
};

export default ThemeToggle;
