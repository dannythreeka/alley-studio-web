'use client';

import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  ...restProps
}) => {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center py-2 px-4 rounded-sm text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary:
      'bg-accent text-foreground hover:bg-accent/80 focus:ring-accent/50',
    outline:
      'border border-primary text-primary hover:bg-primary/10 focus:ring-primary/30',
  };

  // Disabled styles
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`;

  // Return link if href is provided
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Return button otherwise
  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
