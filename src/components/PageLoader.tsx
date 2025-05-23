'use client';

import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const PageLoader: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for at least 1500ms for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update aria-live region when loading state changes
    const loadingStatus = document.getElementById('loading-status');
    if (loadingStatus) {
      loadingStatus.textContent = loading
        ? 'Loading site content, please wait.'
        : 'Content loaded';
    }
  }, [loading]);

  // Logo animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {/* Accessibility: hidden status for screen readers */}
      <div
        className="sr-only"
        role="status"
        id="loading-status"
        aria-live="polite"
      >
        {loading ? 'Loading site content, please wait.' : 'Content loaded'}
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden={!loading}
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div className="relative" variants={logoVariants}>
                <div className="w-24 h-24 relative">
                  <Image
                    src="/images/alley-studio-logo.svg"
                    alt="Loading"
                    fill
                    className="object-contain"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full opacity-80"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>

              <motion.div
                className="text-3xl font-bold tracking-wider font-[var(--font-space-grotesk)] text-primary"
                variants={textVariants}
              >
                ALLEY STUDIO
              </motion.div>

              <motion.div
                className="text-md text-gray font-[var(--font-noto-sans-jp)]"
                variants={textVariants}
              >
                巷製所
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageLoader;
