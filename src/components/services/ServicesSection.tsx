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
      className="bg-background p-6 rounded-lg shadow-md border border-gray-light hover:border-primary transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0,0,0,0.2)' }}
    >
      <div className="text-4xl mb-4">{iconEmoji}</div>
      <h3 className="text-xl font-bold mb-1 font-[var(--font-space-grotesk)]">
        {title}
      </h3>
      <p className="text-primary font-[var(--font-noto-sans-jp)] text-sm mb-3">
        {t(id + '_title')}
      </p>
      <p className="text-gray">{t(id + '_description')}</p>
    </motion.div>
  );
};

const ServicesSection: FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: 'Web Development',
      id: 'service_1',
      iconEmoji: '🌐',
      delay: 0.1,
    },
    {
      title: 'System Integration',
      id: 'service_2',
      iconEmoji: '🔄',
      delay: 0.2,
    },
    {
      title: 'Project Management',
      id: 'service_3',
      iconEmoji: '📊',
      delay: 0.3,
    },
    {
      title: 'Tech Consulting',
      id: 'service_4',
      iconEmoji: '💡',
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
