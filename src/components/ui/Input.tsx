import { FC, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: FieldError | string;
  className?: string;
}

const Input: FC<InputFieldProps> = ({ label, icon, error, className = '', ...props }) => {
  const hasError = !!error;

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={props.id} className="label px-1">
          <span className="label-text text-sm font-medium text-black">{label}</span>
        </label>
      )}

      <div
        className={`flex items-center rounded-lg px-3 py-2 transition-all duration-150 ${
          hasError
            ? 'border border-error focus-within:ring-2 focus-within:ring-error'
            : 'border border-gray-300 focus-within:ring-2 focus-within:ring-primary'
        } ${className}`}
      >
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        <input
          className="w-full p-0 bg-transparent text-sm focus:outline-none placeholder-gray-400"
          {...props}
        />
      </div>

      {hasError && (
        <p className="text-error text-xs mt-1 px-1">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
