import { FC } from 'react';
import { motion } from 'framer-motion';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import useTranslation from '@/hooks/useTranslation';

const AboutSection: FC = () => {
  const { t } = useTranslation();

  return (
    <Section id="about" className="bg-light text-foreground">
      <SectionTitle
        title={t('about_title')}
        subtitle={t('about_description_1')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]">
              {t('who_we_are')}
            </h3>
            <p className="text-gray mb-4">{t('who_we_are_1')}</p>
            <p className="text-gray">{t('who_we_are_2')}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]">
              {t('our_philosophy')}
            </h3>
            <p className="text-gray mb-4">{t('our_philosophy_1')}</p>
            <p className="text-gray">{t('our_philosophy_2')}</p>
          </div>
        </motion.div>
        {/* 
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-light dark:bg-gray p-6 rounded-lg h-full flex flex-col justify-center">
            <h4 className="text-xl font-semibold mb-2">English</h4>
            <p>
              Modern technical solutions with Japanese-inspired design
              precision.
            </p>
          </div>

          <div className="bg-primary p-6 rounded-lg text-light h-full flex flex-col justify-center">
            <h4 className="text-xl font-semibold mb-2 font-[var(--font-noto-sans-jp)]">
              中文
            </h4>
            <p className="font-[var(--font-noto-sans-jp)]">
              具有日式設計精確度的現代技術解決方案。
            </p>
          </div>

          <div className="col-span-2 bg-accent-light dark:bg-accent dark:bg-opacity-20 p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-2">Our Values</h4>
            <ul className="list-disc list-inside space-y-1 text-gray">
              <li>Simplicity in design</li>
              <li>Technical excellence</li>
              <li>Attention to detail</li>
              <li>User-centered approach</li>
            </ul>
          </div>
        </motion.div> */}
      </div>
    </Section>
  );
};

export default AboutSection;
