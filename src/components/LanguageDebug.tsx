'use client';

import { FC, useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useLanguage } from '@/context/LanguageProvider';
import useTranslation from '@/hooks/useTranslation';

const LanguageDebug: FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [browserLanguage, setBrowserLanguage] = useState<string>('');
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  // Effects that need browser APIs
  useEffect(() => {
    // Get browser language
    setBrowserLanguage(navigator.language);

    // Get stored language preference
    setStoredLanguage(localStorage.getItem('language'));

    // Get current URL
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, my: 4, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        🔍 Language Debug Info
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List dense>
        <ListItem>
          <ListItemText
            primary="Active Language"
            secondary={`${language} (${t('language_name')})`}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Browser Language"
            secondary={browserLanguage}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Stored Language Preference"
            secondary={storedLanguage || 'Not set'}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Current URL"
            secondary={currentUrl}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Translation Test"
            secondary={`"about" → "${t('about')}" | "services" → "${t(
              'services'
            )}" | "contact" → "${t('contact')}"`}
            primaryTypographyProps={{ fontWeight: 'bold' }}
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 2, fontSize: '0.8rem', color: 'text.secondary' }}>
        <p>This component is for development purposes only.</p>
      </Box>
    </Paper>
  );
};

export default LanguageDebug;
