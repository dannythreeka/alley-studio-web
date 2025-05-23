import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Section: FC<SectionProps> = ({
  id,
  children,
  className = '',
  fullWidth = false,
}) => {
  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-8'}>
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
