import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MINI DEV Studio | Modern Technical Solutions',
  description:
    'MINI DEV is a boutique development studio that combines technical expertise with clean, Japanese-inspired design principles.',
  keywords:
    'web development, system integration, technical consulting, project management, japanese design, minimalist design',
  openGraph: {
    title: 'MINI DEV Studio | Modern Technical Solutions',
    description:
      'MINI DEV is a boutique development studio that combines technical expertise with clean, Japanese-inspired design principles.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'MINI DEV Studio',
      },
    ],
  },
};

export default metadata;
