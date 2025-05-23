'use client';

import { FC } from 'react';

const SkipToContentLink: FC = () => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
      setTimeout(() => {
        mainContent.removeAttribute('tabindex');
      }, 1000);
    }
  };

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-light focus:rounded-sm focus:shadow-sm"
      onClick={handleSkip}
    >
      Skip to content
    </a>
  );
};

export default SkipToContentLink;
