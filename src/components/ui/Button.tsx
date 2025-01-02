import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'primary' | 'outline' | 'danger';
}

export const Button = ({
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classn = cn(
    className,
    'transition-colors',
    'rounded-md',
    'p-2',
    'leading-none',
    'h-[34px]',
    'sm:h-[38px]',
    'md:h-[42px]',
    'cursor-pointer',
    'box-border',
    'text-nowrap',
    {
      primary: 'bg-teal-500 hover:bg-teal-600 text-white',
      outline: 'border-2 border-teal-500 bg-white text-secondary hover:bg-whiteHover',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
    }[variant],
  );

  return (
    <button className={classn} {...props}>
      {children}
    </button>
  );
};