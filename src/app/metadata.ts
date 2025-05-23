import { Metadata } from 'next';

export const siteConfig = {
  name: '巷製所 (Alley Studio)',
  description:
    'Crafting digital experiences with Japanese minimalist design principles.',
  url: 'https://alley-studio.example.com',
  ogImage: 'https://alley-studio.example.com/alley-studio-favicon.svg',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'web development',
    'design',
    'japanese',
    'minimalist',
    'craftsmanship',
    'next.js',
    'react',
    'tailwindcss',
  ],
  authors: [
    {
      name: '巷製所 (Alley Studio)',
      url: siteConfig.url,
    },
  ],
  creator: 'Alley Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@minidevstudio',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/alley-studio-logo.svg',
    shortcut: '/alley-studio-logo.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/manifest.json`,
};
