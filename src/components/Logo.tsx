import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-10 w-10 mr-3 relative">
        <Image
          src="/images/alley-studio-logo.svg"
          alt="Alley Studio Logo"
          width={40}
          height={40}
          className="rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wider font-[var(--font-noto-sans-jp)]">
          巷製所
        </span>
        <span className="text-xs text-gray tracking-wide font-[var(--font-noto-sans-jp)]">
          Alley Studio
        </span>
      </div>
    </motion.div>
  );
};

export default Logo;
