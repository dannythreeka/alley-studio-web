# Alley Studio - Studio Website

A modern, multilingual website for Alley Studio (巷製所), featuring Japanese-inspired design principles and technical precision.

![Alley Studio](public/og-image.svg)

## 🌏 Features

- **Multilingual Support**: Traditional Chinese (default), English, and Japanese
- **Modern Design**: Clean, minimalist UI with Japanese design influences
- **Responsive Layout**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **SEO Optimized**: With language-specific meta tags and URL-based routing
- **Animations**: Smooth transitions and micro-interactions
- **Dark/Light Mode**: Theme switching with system preference detection
- **Performance Optimized**: Fast loading with optimized assets
- **Contact Form Security**: Cloudflare Turnstile, rate limiting, honeypot anti-spam

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [MUI](https://mui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API
- **Deployment**: Vercel
- **Linting/Formatting**: ESLint (flat config), Prettier, lint-staged

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/alley-studio-web.git
   cd alley-studio-web
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables

   - Copy `.env.local.example` to `.env.local` (or create manually)
   - Add your Cloudflare Turnstile keys and Resend API key:
     ```env
     NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
     TURNSTILE_SECRET_KEY=your_turnstile_secret_key
     RESEND_API_KEY=your_resend_api_key
     UPSTASH_REDIS_REST_URL=your_upstash_url
     UPSTASH_REDIS_REST_TOKEN=your_upstash_token
     ```

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the website

## 🌍 Multilingual Implementation

The website supports three languages with automatic detection and manual switching:

- 🇹🇼 Traditional Chinese (zh-TW) - Default
- 🇺🇸 English (en)
- 🇯🇵 Japanese (ja)

### Language Detection

The language is determined in the following priority order:

1. URL path parameter (e.g., `/en/` for English)
2. localStorage saved preference
3. Browser language setting
4. Fallback to Traditional Chinese

### URL Structure

- Default language (zh-TW): `https://alley-studio.com/`
- English: `https://alley-studio.com/en/`
- Japanese: `https://alley-studio.com/ja/`

For detailed implementation information, see [multilingual-implementation.md](docs/multilingual-implementation.md).

## 📐 Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── en/              # English routes
│   ├── ja/              # Japanese routes
│   └── page.tsx         # Main page (zh-TW)
├── components/          # UI components
│   ├── about/           # About section components
│   ├── footer/          # Footer components
│   ├── hero/            # Hero section components
│   ├── services/        # Services section components
│   └── works/           # Portfolio section components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── theme/               # Theme configuration
└── translations/        # Language translations
```

## 🧩 Key Components

- **LanguageProvider**: Context for language state management
- **ThemeProvider**: Handles light/dark mode preferences
- **PageLoader**: Initial loading animation
- **Navbar**: Navigation with responsive mobile menu
- **Sections**: Hero, About, Services, Works, and Contact
- **ContactForm**: Secure contact form with Turnstile, rate limiting, and honeypot

## 📝 Development Guidelines

### Adding a New Language

1. Add the language code to the `LanguageCode` type in `/src/context/LanguageProvider.tsx`
2. Add translations in `/src/translations/index.ts`
3. Create language-specific folders in `/src/app/`
4. Update `middleware.ts` for language detection

### Adding New Content

Ensure all text content is wrapped with the translation hook:

```tsx
const { t } = useTranslation();
<h1>{t('page_title')}</h1>;
```

### Code Quality

- Run `yarn lint` and `yarn format` before commit (auto-run by lint-staged)
- TypeScript strict mode is enabled
- ESLint/Prettier are integrated (flat config)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Chih-Kai Wang - Developer & Designer

---

© 2025 Alley Studio (巷製所). All rights reserved.
