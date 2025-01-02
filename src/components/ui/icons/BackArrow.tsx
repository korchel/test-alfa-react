import { FC } from "react";

interface Props {
  className?: string;
}

export const BackArrow: FC<Props> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M16.752,23.994,6.879,14.121a3,3,0,0,1,0-4.242L16.746.012,18.16,1.426,8.293,11.293a1,1,0,0,0,0,1.414l9.873,9.873Z" />
    </svg>
  );
};



