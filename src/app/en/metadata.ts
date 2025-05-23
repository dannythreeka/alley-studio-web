import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alley Studio | Modern Technical Solutions',
  description:
    'Alley is a boutique development studio that combines technical expertise with clean, Japanese-inspired design principles.',
  keywords:
    'web development, system integration, technical consulting, project management, japanese design, minimalist design',
  openGraph: {
    title: 'Alley Studio | Modern Technical Solutions',
    description:
      'Alley is a boutique development studio that combines technical expertise with clean, Japanese-inspired design principles.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Alley Studio',
      },
    ],
  },
};

export default metadata;
