import { FC } from 'react';
import { motion } from 'framer-motion';
import Section from '../Section';
import SectionTitle from '../SectionTitle';
import useTranslation from '@/hooks/useTranslation';

interface ServiceCardProps {
  title: string;
  iconEmoji: string;
  delay: number;
  id: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, iconEmoji, delay, id }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="bg-background p-6 rounded-sm shadow-sm  transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px -10px rgba(0,0,0,0.1)' }}
    >
      <div className="text-3xl mb-4">{iconEmoji}</div>
      <h3 className="text-xl font-medium mb-2 font-[var(--font-noto-sans-tc)]">
        {title}
      </h3>
      <p className="text-gray text-md opacity-90 italic">
        {t(id + '_description')}
      </p>
    </motion.div>
  );
};

const ServicesSection: FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('service_1_title'),
      id: 'service_1',
      iconEmoji: '🌐',
      delay: 0.1,
    },
    {
      title: t('service_2_title'),
      id: 'service_2',
      iconEmoji: '🤖',
      delay: 0.2,
    },
    {
      title: t('service_3_title'),
      id: 'service_3',
      iconEmoji: '✨',
      delay: 0.3,
    },
    {
      title: t('service_4_title'),
      id: 'service_4',
      iconEmoji: '🚀',
      delay: 0.4,
    },
  ];

  return (
    <Section id="services">
      <SectionTitle
        title={t('services_title')}
        subtitle={t('services_description')}
        center
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </Section>
  );
};

export default ServicesSection;
