import { FC } from "react";
import { cn } from "../../lib/utils";

type Size = 'lg' | 'sm';

interface Props {
  text: string;
  size?: Size;
  className?: string;
}

export const Title: FC<Props> = ({ text, size = 'lg', className }) => {
  return (
    <>
      {(size === 'lg' as Size) && <h1 className={cn(className, "font-bold text-center text-lg")}>{text}</h1>}
      {(size === 'sm' as Size) && <h2 className={cn(className, "font-bold")}>{text}</h2>}
    </>
  );
};
