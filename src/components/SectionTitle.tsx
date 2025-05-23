import { FC } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({
  title,
  subtitle,
  center = false,
  className = '',
}) => {
  const alignClass = center ? 'text-center' : '';

  return (
    <div className={`mb-12 ${alignClass} ${className}`}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-2 font-[var(--font-space-grotesk)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-gray text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
