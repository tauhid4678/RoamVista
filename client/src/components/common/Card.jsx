import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-6',
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white dark:bg-darkSurface-800 border border-sand-200/90 dark:border-darkSurface-700/80 rounded-2xl transition-all duration-300';
  const hoverStyles = hoverEffect
    ? 'hover:-translate-y-1 hover:shadow-editorial-hover hover:border-primary-600/30 dark:hover:border-primary-400/30 cursor-pointer'
    : 'shadow-editorial';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`pb-4 border-b border-sand-200/80 dark:border-darkSurface-700/70 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-serif font-bold text-sand-900 dark:text-sand-50 ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-xs text-sand-500 dark:text-sand-400 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`py-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/70 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
