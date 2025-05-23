import { Metadata } from 'next';

export const siteConfig = {
  name: 'MINI DEV',
  description:
    'Modern technical solutions with Japanese-inspired design precision.',
  url: 'https://minidev.example.com',
  ogImage: 'https://minidev.example.com/og-image.jpg',
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
    'technical',
    'modern',
    'next.js',
    'react',
    'tailwindcss',
  ],
  authors: [
    {
      name: 'MINI DEV Studio',
      url: siteConfig.url,
    },
  ],
  creator: 'MINI DEV Studio',
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/manifest.json`,
};
