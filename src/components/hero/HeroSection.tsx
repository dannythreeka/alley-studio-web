import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../Button';
import Section from '../Section';
import useTranslation from '@/hooks/useTranslation';

const HeroSection: FC = () => {
  const { t } = useTranslation();

  return (
    <Section
      className="min-h-[90vh] flex items-center bg-background border-b border-accent"
      immediate={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span aria-hidden className="block">
              巷製所
            </span>
            <motion.span
              aria-hidden
              className="block text-xl md:text-2xl text-gray font-[var(--font-noto-sans-tc)] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Alley Studio
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl leading-relaxed text-gray max-w-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Button
              href="#services"
              className="bg-accent text-background dark:bg-primary dark:text-black"
            >
              {t('hero_cta')}
            </Button>
            <Button variant="outline" href="#contact">
              {t('hero_contact')}
            </Button>
          </motion.div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 border border-accent/30 dark:border-accent/40 rounded-sm backdrop-blur-md bg-background/30 dark:bg-background/10 shadow-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: 'spring',
              stiffness: 70,
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
              transition: { duration: 0.4 },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent dark:from-accent/10 dark:to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.div
              className="absolute -right-12 -top-12 w-24 h-24 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 3, delay: 0.5 }}
                className="w-full h-full relative"
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-accent/40 dark:border-accent/60" />
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-accent/40 dark:border-accent/60" />

                <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <Image
                    src="/images/alley-studio-logo.svg"
                    alt="Alley Studio Logo"
                    width={200}
                    height={200}
                    layout="responsive"
                    className="p-6"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-2 right-2 text-xs text-accent/70 dark:text-accent/90 font-[var(--font-noto-sans-jp)] tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                >
                  Alley Studio
                </motion.div>

                {/* <motion.div
                  className="absolute top-2 left-2 text-xs text-accent/70 dark:text-accent/90 font-[var(--font-noto-sans-tc)] tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                >
                  2025
                </motion.div> */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
