import React, { forwardRef } from 'react';

export const Textarea = forwardRef(({
  id,
  name,
  label,
  rows = 4,
  placeholder = '',
  value,
  onChange,
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const inputId = id || name;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide text-neutral-700 dark:text-neutral-300 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-accent-500">*</span>}
          </span>
        </label>
      )}

      <textarea
        ref={ref}
        id={inputId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        className={`w-full text-sm rounded-xl p-3.5 transition-all duration-200 outline-none resize-y
          bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          border
          ${error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
          }
          disabled:bg-neutral-100 dark:disabled:bg-neutral-900 disabled:opacity-60 disabled:cursor-not-allowed
        `}
        {...props}
      />

      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-rose-500 mt-0.5">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
