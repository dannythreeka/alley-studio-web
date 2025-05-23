import { Inter, Noto_Sans_JP, Noto_Sans_TC } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { metadata as siteMetadata } from './metadata';
import { ThemeProvider } from '@/context/ThemeProvider';
import LanguageProvider from '@/context/LanguageProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// Export metadata
export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine the HTML lang attribute based on URL path
  // This will be used for SEO and accessibility
  const getHtmlLang = () => {
    // Next.js automatically applies the root layout to all pages, so we cannot get the current language from params
    // In actual deployment, language switching will be handled by middleware
    return 'zh-TW'; // Default to Traditional Chinese
  };

  return (
    <html lang={getHtmlLang()}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <link
          rel="icon"
          href="/alley-studio-favicon.svg"
          type="image/svg+xml"
        />
        <meta name="theme-color" content="#121212" />

        {/* hreflang tags for SEO */}
        <link
          rel="alternate"
          href="https://alley-studio.com/"
          hrefLang="zh-TW"
        />
        <link
          rel="alternate"
          href="https://alley-studio.com/en"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://alley-studio.com/ja"
          hrefLang="ja"
        />
        <link
          rel="alternate"
          href="https://alley-studio.com/"
          hrefLang="x-default"
        />

        {/* Additional language meta tags */}
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="ja_JP" />
        <meta property="og:locale" content="zh_TW" />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
