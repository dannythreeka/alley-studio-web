'use client';

import { useLanguage } from '@/context/LanguageProvider';
import translations from '@/translations';

type LanguageCode = 'zh-TW' | 'en' | 'ja';
type TranslationStrings = Record<string, string>;

export const useTranslation = () => {
  // Always call hooks at the top level
  const { language } = useLanguage();

  // Helper function to get translation string
  const t = (key: string): string => {
    try {
      const currentLang = language as LanguageCode;
      const langStrings = translations[currentLang] as TranslationStrings;

      // Check if the key exists in current language strings
      if (langStrings && key in langStrings) {
        return langStrings[key] || key;
      }

      // Fallback to default language (zh-TW)
      if (currentLang !== 'zh-TW') {
        const defaultStrings = translations['zh-TW'] as TranslationStrings;
        if (defaultStrings && key in defaultStrings) {
          return defaultStrings[key] || key;
        }
      }
    } catch (error) {
      console.error('Translation error for key:', key, error);
    }

    // Fallback to key if translation not found or error occurs
    return key;
  };

  return { t, language };
};

export default useTranslation;
