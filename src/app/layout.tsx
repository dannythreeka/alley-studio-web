import { Inter, Noto_Sans_JP, Space_Grotesk } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { metadata as siteMetadata } from './metadata';
import { ThemeProvider } from '@/context/ThemeProvider';
import LanguageProvider from '@/context/LanguageProvider';
import EmotionRootStyleRegistry from '@/theme/EmotionProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

// Export metadata
export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { lang?: string };
}>) {
  // Determine the HTML lang attribute based on URL path
  // This will be used for SEO and accessibility
  const getHtmlLang = () => {
    if (params?.lang === 'en') return 'en';
    if (params?.lang === 'ja') return 'ja';
    return 'zh-TW'; // Default to Traditional Chinese
  };

  return (
    <html lang={getHtmlLang()}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <link rel="icon" href="/mini-dev-favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#2F80ED" />

        {/* hreflang tags for SEO */}
        <link rel="alternate" href="https://mini-dev.com/" hrefLang="zh-TW" />
        <link rel="alternate" href="https://mini-dev.com/en" hrefLang="en" />
        <link rel="alternate" href="https://mini-dev.com/ja" hrefLang="ja" />
        <link
          rel="alternate"
          href="https://mini-dev.com/"
          hrefLang="x-default"
        />

        {/* Additional language meta tags */}
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="ja_JP" />
        <meta property="og:locale" content="zh_TW" />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <EmotionRootStyleRegistry>
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </EmotionRootStyleRegistry>
      </body>
    </html>
  );
}
