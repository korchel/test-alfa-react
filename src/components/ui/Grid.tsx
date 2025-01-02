import { FC, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Props {
  children: ReactNode;
  className: string;
}

export const Grid: FC<Props> = ({ children, className }) => (
  <div className={cn(
    className,
    `grid gap-3
      xl:grid-cols-4
      lg:grid-cols-3 lg:gap-10
      md:grid-cols-2 md:gap-5`
  )}>
    {children}
  </div>
);