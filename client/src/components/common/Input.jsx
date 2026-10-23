import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  id,
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  icon = null,
  rightIcon = null,
  onRightIconClick,
  className = '',
  ...props
}, ref) => {
  const inputId = id || name;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide text-sand-800 dark:text-sand-200 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-earth-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-sand-400 dark:text-darkSurface-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`w-full text-xs sm:text-sm rounded-xl transition-all duration-200 outline-none
            ${icon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            py-2.5
            bg-sand-50/70 dark:bg-darkSurface-900
            text-sand-900 dark:text-sand-100
            placeholder:text-sand-400 dark:placeholder:text-darkSurface-400
            border
            ${error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-sand-300 dark:border-darkSurface-600 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20'
            }
            disabled:bg-sand-200 dark:disabled:bg-darkSurface-950 disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        />

        {rightIcon && (
          <div
            onClick={onRightIconClick}
            className={`absolute right-3.5 text-sand-400 hover:text-sand-700 dark:hover:text-sand-200 flex items-center ${onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'}`}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-rose-500 mt-0.5">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-xs text-sand-500 dark:text-sand-400 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
