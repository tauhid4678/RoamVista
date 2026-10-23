import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkSurface-900 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] tracking-normal';

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-sand-50 shadow-sm hover:shadow focus-visible:ring-primary-600',
    secondary: 'bg-accent-400 hover:bg-accent-500 text-primary-950 font-semibold shadow-sm focus-visible:ring-accent-500',
    earth: 'bg-earth-500 hover:bg-earth-600 text-white shadow-sm focus-visible:ring-earth-500',
    outline: 'border border-sand-300 dark:border-darkSurface-600 bg-transparent hover:bg-sand-100/70 dark:hover:bg-darkSurface-800 text-sand-900 dark:text-sand-100 focus-visible:ring-primary-600',
    ghost: 'bg-transparent hover:bg-sand-100/80 dark:hover:bg-darkSurface-800 text-sand-800 dark:text-sand-200 focus-visible:ring-primary-600',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white shadow-sm focus-visible:ring-rose-600',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-xs font-semibold gap-2',
    lg: 'px-7 py-3.5 text-sm font-semibold gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
