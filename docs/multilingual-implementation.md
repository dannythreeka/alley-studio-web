# Multilingual Implementation Documentation

This document explains how the multilingual feature is implemented in the MINI DEV website.

## Overview

The website supports three languages:

- Traditional Chinese (zh-TW) - Default language
- English (en)
- Japanese (ja)

## Key Components

### 1. LanguageProvider Context

Located at `/src/context/LanguageProvider.tsx`, this context manages the language state throughout the application. It:

- Detects the user's language preference (URL > localStorage > browser)
- Provides a way to switch languages
- Handles URL path updates for SEO
- Includes safeguards for server-side rendering

Usage:

```tsx
const { language, setLanguage } = useLanguage();
```

### 2. Translation System

Located at `/src/hooks/useTranslation.ts` and `/src/translations/index.ts`, this system:

- Provides translation strings for all supported languages
- Offers a convenient hook (`useTranslation`) to access translations
- Includes fallback mechanisms if a translation is missing

Usage:

```tsx
const { t } = useTranslation();
console.log(t('about')); // Returns translated string for 'about'
```

### 3. URL-based Language Routing

Located at `/src/middleware.ts`, this middleware:

- Detects the user's browser language
- Redirects to language-specific routes (e.g., `/en/` for English)
- Preserves the default language (zh-TW) at the root path for SEO

### 4. HTML Lang Attribute

The root layout (`/src/app/layout.tsx`) dynamically sets the HTML lang attribute based on the URL path for better SEO and accessibility.

### 5. Language-Specific Metadata

Each language has its own metadata file:

- `/src/app/en/metadata.ts` for English
- `/src/app/ja/metadata.ts` for Japanese

The default metadata is at `/src/app/metadata.ts`.

## Language Detection Logic

1. Check URL path for language prefix
2. Check localStorage for saved preference
3. Detect browser language
4. Default to Traditional Chinese (zh-TW)

## Testing & Debugging

A `LanguageDebug` component is available in development mode to show:

- Current active language
- Browser language
- Stored language preference
- Current URL
- Translation test examples

## SEO Optimization

- URL-based language routing (e.g., `/en/` for English)
- Dynamic HTML lang attribute
- hreflang tags for search engines
- Language-specific metadata
- OG locale alternates

## Accessibility Features

- Skip to content link with proper translations
- ARIA attributes for language switcher
- Semantic HTML structure

## Future Improvements

- Add more translations as needed
- Consider implementing RTL language support
- Add automatic content negotiation based on Accept-Language header
