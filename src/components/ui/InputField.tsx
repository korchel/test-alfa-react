import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import { cn } from '../../lib/utils';

export interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  placeholder?: string;
  label?: string;
  actionButton?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = forwardRef(
  (
    {
      type = 'text',
      error,
      placeholder,
      label,
      className,
      actionButton = null,
      onChange,
      ...props
    }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={cn(className, 'relative')}>
        {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
        <input
          type={type}
          id={label}
          className={cn(
            error
              ? 'border-red-400'
              : 'border-slate-400',
            'block p-2 border bg-transparent rounded-md w-full',
            'placeholder:text-gray-400',
            'outline-none',
            'focus:ring focus:ring-slate-400 focus:ring-opacity-50',
            'autofill:shadow-[inset_0_0_0px_1000px_white]',
          )}
          placeholder={placeholder}
          {...props}
          ref={ref}
          onChange={onChange}
        />
        {actionButton}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);

InputField.displayName = 'input field';