import React from 'react';
import { Compass, Loader2 } from 'lucide-react';

export const Loading = ({ fullScreen = false, message = 'Loading RoamVista...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
        <div className="relative flex items-center justify-center">
          <img
            src="/logo/logo-cropped.png"
            alt="RoamVista"
            className="h-20 w-auto object-contain dark:hidden animate-pulse"
          />
          <img
            src="/logo/logo-cropped-dark.png"
            alt="RoamVista"
            className="h-20 w-auto object-contain hidden dark:block animate-pulse"
          />
        </div>
        <p className="mt-4 text-sm font-semibold text-neutral-700 dark:text-neutral-200 tracking-wide animate-pulse">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 gap-3">
      <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{message}</span>
    </div>
  );
};

export default Loading;
