import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  immediate?: boolean; // New property to control whether to display immediately
}

const Section: FC<SectionProps> = ({
  id,
  children,
  className = '',
  fullWidth = false,
  immediate = false, // Default to false, maintain original behavior
}) => {
  return (
    <motion.section
      id={id}
      className={`py-12 md:py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      // If immediate is true, use animate instead of whileInView
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 } })}
      // For non-immediate display, add viewport configuration
      {...(!immediate && {
        viewport: {
          once: true, // Trigger only once
          margin: '-100px 0px', // Trigger animation early
        },
      })}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`${
          fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-8'
        } ${!immediate && 'border-b border-accent pb-6'}`}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
