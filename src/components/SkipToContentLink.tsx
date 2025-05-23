'use client';

import { FC } from 'react';
import useTranslation from '@/hooks/useTranslation';

// Add skip_to_content to translations
const SkipToContentLink: FC = () => {
  const { t } = useTranslation();

  return (
    <a
      href="#about"
      className="absolute top-0 left-0 p-3 -translate-y-full focus:translate-y-0 bg-primary text-light z-50 focus:outline-none transition-transform"
    >
      {t('skip_to_content')}
    </a>
  );
};

export default SkipToContentLink;
