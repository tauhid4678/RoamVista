import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const variants = {
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    text: 'rounded-md h-4',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      style={style}
      className={`animate-shimmer bg-neutral-200 dark:bg-neutral-700/60 ${variants[variant] || variants.rectangular} ${className}`}
    />
  );
};

export const TourCardSkeleton = () => (
  <div className="bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 rounded-2xl overflow-hidden flex flex-col h-[460px] shadow-sm">
    <Skeleton className="w-full h-52 !rounded-none" />
    <div className="p-5 flex-1 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="w-24 h-5 rounded-full" />
          <Skeleton className="w-14 h-5 rounded-full" />
        </div>
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>

      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between">
        <div>
          <Skeleton className="w-12 h-3 mb-1" />
          <Skeleton className="w-20 h-6" />
        </div>
        <Skeleton className="w-28 h-9 rounded-xl" />
      </div>
    </div>
  </div>
);

export default Skeleton;
