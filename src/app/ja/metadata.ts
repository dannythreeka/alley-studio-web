import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '巷製所 | 現代的な技術ソリューション',
  description:
    '巷製所は、技術的専門知識と日本風のクリーンなデザイン原則を組み合わせたブティック開発スタジオです。',
  keywords:
    'ウェブ開発, システム統合, 技術コンサルティング, プロジェクト管理, 日本的デザイン, ミニマリストデザイン',
  openGraph: {
    title: '巷製所 | 現代的な技術ソリューション',
    description:
      '巷製所は、技術的専門知識と日本風のクリーンなデザイン原則を組み合わせたブティック開発スタジオです。',
    locale: 'ja_JP',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '巷製所',
      },
    ],
  },
};

export default metadata;
