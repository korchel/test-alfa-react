import { FC } from "react";
import { cn } from "../../lib/utils";
import { Spinner } from "./icons";

interface Props {
  className?: string;
}

export const Loader: FC<Props> = ({className}) => (
  <div className={cn(className, "w-full flex items-center justify-center")}>
    <Spinner />
  </div>
);