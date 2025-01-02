import { cn } from '../../lib/utils';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  TextareaHTMLAttributes,
} from 'react';

import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';


export interface ITextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export const TextArea = forwardRef(
  (
    { error, placeholder, label, className, ...props }: ITextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div className={cn(className, 'relative')}>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <textarea
          className={cn(
            error
              ? 'border-red-400'
              : 'border-slate-400',
            'block p-2 min-h-44',
            'border outline-none rounded-md w-full bg-transparent focus:ring focus:ring-slate-400 focus:ring-opacity-50',
          )}
          placeholder={placeholder}
          {...props}
          ref={ref}
          id={label}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);