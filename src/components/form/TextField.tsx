'use client';

import {
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  error,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-foreground text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray">
            {startIcon}
          </span>
        )}
        <input
          id={id}
          className={`
            block border ${error ? 'border-red-500' : 'border-accent/50'} 
            rounded-sm bg-background w-full py-2 
            ${startIcon ? 'pl-10' : 'pl-3'} 
            ${endIcon ? 'pr-10' : 'pr-3'} 
            focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary/30
            transition-all text-foreground
            ${className}
          `}
          {...props}
        />
        {endIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray">
            {endIcon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export const TextArea: FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-foreground text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`
          block border ${error ? 'border-red-500' : 'border-accent/50'} 
          rounded-sm bg-background w-full py-2 px-3
          focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary/30
          transition-all text-foreground
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};
