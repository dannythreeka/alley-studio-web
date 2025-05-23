import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../Button';
import Section from '../Section';
import useTranslation from '@/hooks/useTranslation';

const HeroSection: FC = () => {
  const { t } = useTranslation();

  return (
    <Section className="min-h-[90vh] flex items-center bg-gradient-to-br from-background to-gray-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-[var(--font-space-grotesk)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="block">MINI DEV</span>
            <motion.span
              className="block text-xl md:text-2xl text-gray font-[var(--font-noto-sans-jp)] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              微開發工作室
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 text-gray max-w-lg"
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
            <Button href="#contact">{t('hero_contact')}</Button>
            <Button variant="outline" href="#services">
              {t('hero_cta')}
            </Button>
          </motion.div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80"
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary rounded-lg transform rotate-3"
              initial={{ rotate: 10 }}
              animate={{ rotate: 3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ rotate: 5 }}
            ></motion.div>
            <motion.div
              className="absolute inset-0 bg-gray-light dark:bg-gray rounded-lg -rotate-3 flex items-center justify-center"
              initial={{ rotate: -10 }}
              animate={{ rotate: -3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ rotate: -5 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Image
                  src="/images/mini-dev-logo.svg"
                  alt="MINI DEV Logo"
                  width={200}
                  height={200}
                  className="p-4"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
