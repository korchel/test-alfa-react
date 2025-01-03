
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface IErrorMessage
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  children: ReactNode;
}

export const ErrorMessage = ({ children, className }: IErrorMessage) => (
  <p
    className={cn(
      className,
      'absolute text-xs sm:text-sm leading-tight text-red-400',
    )}
  >
    {children}
  </p>
);