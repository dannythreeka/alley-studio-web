'use client';

import { FC, ReactNode } from 'react';
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';

interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'color'> {
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
  // Map custom variants to MUI variants and colors
  let muiVariant: 'contained' | 'outlined' = 'contained';
  let muiColor: 'primary' | 'secondary' = 'primary';

  switch (variant) {
    case 'primary':
      muiVariant = 'contained';
      muiColor = 'primary';
      break;
    case 'secondary':
      muiVariant = 'contained';
      muiColor = 'secondary';
      break;
    case 'outline':
      muiVariant = 'outlined';
      muiColor = 'primary';
      break;
  }

  return (
    <MUIButton
      variant={muiVariant}
      color={muiColor}
      onClick={onClick}
      href={href}
      type={type}
      disabled={disabled}
      className={className}
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: '6px',
        fontWeight: 500,
        transition: 'all 0.3s',
        '&:hover': {
          transform: disabled ? 'none' : 'scale(1.03)',
        },
        '&:active': {
          transform: disabled ? 'none' : 'scale(0.98)',
        },
        ...(variant === 'outline' && {
          borderWidth: 2,
        }),
      }}
      {...restProps}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
