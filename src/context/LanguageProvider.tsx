'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

type LanguageCode = 'zh-TW' | 'en' | 'ja';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  // Check for both conditions - SSR or context being undefined
  if (typeof window === 'undefined' || context === undefined) {
    // For SSR or when the context is not available, provide a default implementation
    // This prevents the error during SSR and component rendering outside provider
    return {
      language: 'zh-TW',
      setLanguage: () => {
        // If we're in a browser but outside provider, log a warning
        if (
          typeof window !== 'undefined' &&
          process.env.NODE_ENV !== 'production'
        ) {
          console.warn('useLanguage was called outside of LanguageProvider');
        }
      },
    };
  }

  // If we have a valid context and we're not in SSR, return the context
  return context;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('zh-TW');
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run this effect in the browser, not during SSR
    if (typeof window === 'undefined') return;

    setMounted(true);

    const supportedLangs: LanguageCode[] = ['zh-TW', 'en', 'ja'];

    // First check if URL has language code
    const pathSegments = pathname.split('/');
    const urlLang =
      pathSegments.length > 1 ? (pathSegments[1] as LanguageCode) : null;
    const hasValidUrlLang = urlLang && supportedLangs.includes(urlLang);

    try {
      // Then check localStorage for saved preference
      const savedLang = localStorage.getItem('language') as LanguageCode | null;

      // Finally, detect browser language
      const navigatorLang = navigator.language;
      let detectedLang: LanguageCode = 'zh-TW'; // Default to Traditional Chinese

      if (navigatorLang.startsWith('en')) {
        detectedLang = 'en';
      } else if (navigatorLang.startsWith('ja')) {
        detectedLang = 'ja';
      }

      // Priority: URL > localStorage > browser detection
      const initialLang = hasValidUrlLang ? urlLang : savedLang || detectedLang;

      setLanguageState(initialLang);
    } catch (error) {
      // Fallback in case of errors with localStorage or navigator APIs
      console.error('Error detecting language:', error);
      setLanguageState('zh-TW');
    }
  }, [pathname]);

  const setLanguage = (lang: LanguageCode) => {
    // Guard against server-side execution
    if (typeof window === 'undefined') return;

    setLanguageState(lang);

    try {
      localStorage.setItem('language', lang);

      // Update URL to reflect language change (for SEO purposes)
      // Only update URL if we're changing from the default language (zh-TW)
      // or to the default language
      const pathSegments = pathname.split('/');
      let newPath = '';

      const supportedLangs: LanguageCode[] = ['zh-TW', 'en', 'ja'];

      // Check if current path has language prefix
      const hasLangPrefix =
        pathSegments.length > 1 &&
        supportedLangs.includes(pathSegments[1] as LanguageCode);

      if (lang === 'zh-TW') {
        // If switching to default language, remove language prefix if it exists
        if (hasLangPrefix) {
          pathSegments.splice(1, 1); // Remove language segment
          newPath = pathSegments.join('/') || '/';
        } else {
          newPath = pathname; // Keep current path if no language prefix
        }
      } else {
        // If switching to non-default language
        if (hasLangPrefix) {
          // Replace current language code with new one
          pathSegments[1] = lang;
          newPath = pathSegments.join('/');
        } else {
          // Add language prefix
          newPath = `/${lang}${pathname === '/' ? '' : pathname}`;
        }
      }

      router.push(newPath);
    } catch (error) {
      console.error('Error setting language:', error);
      // Continue with state update even if localStorage or navigation fails
    }
  };

  // Don't render until we have mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Export as default only to prevent duplicate declaration
export default LanguageProvider;
