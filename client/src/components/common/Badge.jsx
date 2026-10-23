import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  styleType = 'subtle',
  size = 'md',
  icon = null,
  className = '',
}) => {
  const styles = {
    subtle: {
      primary: 'bg-primary-50 text-primary-800 border-primary-200/70 dark:bg-primary-950/50 dark:text-primary-300 dark:border-primary-800/40',
      secondary: 'bg-accent-50 text-accent-800 border-accent-200/70 dark:bg-accent-950/50 dark:text-accent-300 dark:border-accent-800/40',
      earth: 'bg-earth-50 text-earth-800 border-earth-200/70 dark:bg-earth-950/50 dark:text-earth-300 dark:border-earth-800/40',
      success: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40',
      warning: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/40',
      info: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/40',
      neutral: 'bg-sand-100 text-sand-800 border-sand-200 dark:bg-darkSurface-800 dark:text-sand-300 dark:border-darkSurface-700',
    },
    solid: {
      primary: 'bg-primary-600 text-sand-50',
      secondary: 'bg-accent-400 text-primary-950 font-semibold',
      earth: 'bg-earth-500 text-white',
      success: 'bg-emerald-700 text-white',
      warning: 'bg-amber-700 text-white',
      info: 'bg-sky-700 text-white',
      neutral: 'bg-sand-800 text-sand-50 dark:bg-sand-700',
    },
    outline: {
      primary: 'border border-primary-600 text-primary-700 dark:text-primary-300 bg-transparent',
      secondary: 'border border-accent-400 text-accent-600 dark:text-accent-300 bg-transparent',
      earth: 'border border-earth-500 text-earth-600 dark:text-earth-400 bg-transparent',
      success: 'border border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-transparent',
      warning: 'border border-amber-600 text-amber-600 dark:text-amber-400 bg-transparent',
      info: 'border border-sky-600 text-sky-600 dark:text-sky-400 bg-transparent',
      neutral: 'border border-sand-300 dark:border-darkSurface-600 text-sand-700 dark:text-sand-300 bg-transparent',
    }
  };

  const sizes = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1 tracking-wider uppercase font-semibold',
    md: 'text-xs px-3 py-1 gap-1.5 tracking-normal font-medium',
  };

  const activeStyle = styles[styleType]?.[variant] || styles.subtle.primary;
  const activeSize = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${activeStyle} ${activeSize} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
