import { ButtonHTMLAttributes, FC } from "react";
import { BackArrow } from "./icons/BackArrow";
import { cn } from "../../lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const GoBackButton: FC<Props> = ({ onClick, className }) => {
  return (
    <button
      className={cn(`h-10 w-10 rounded-full shadow-md pl-[6px]
        text-gray-400 bg-gray-100
        hover:text-gray-500 hover:bg-gray-200 hover:shadow-lg transition-all`,
        className
      )}
      onClick={onClick}
    >
      <BackArrow />
    </button>
  );
};