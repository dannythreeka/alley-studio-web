'use client';

import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  color?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const IconButton: FC<IconButtonProps> = ({
  children,
  onClick,
  color = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  const colorStyles = {
    default: 'text-foreground hover:bg-accent/10',
    primary: 'text-primary hover:bg-primary/10',
    secondary: 'text-secondary hover:bg-secondary/10',
  };

  const sizeStyles = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-full transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
        ${colorStyles[color]} ${sizeStyles[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
