'use client';

import { FC } from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeProvider';

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      color="primary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      sx={{
        p: 1,
        bgcolor: theme === 'light' ? 'grey.100' : 'grey.800',
        '&:hover': {
          bgcolor: theme === 'light' ? 'grey.200' : 'grey.700',
        },
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        style={{ display: 'flex' }}
      >
        {theme === 'light' ? (
          <Brightness7Icon fontSize="medium" />
        ) : (
          <Brightness4Icon fontSize="medium" />
        )}
      </motion.div>
    </IconButton>
  );
};

export default ThemeToggle;
