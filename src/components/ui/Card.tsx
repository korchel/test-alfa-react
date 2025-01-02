import { DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from "react";
import { Cross, Heart, HeartFilled } from "./icons";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  isLiked: boolean;
  onRemove: MouseEventHandler<HTMLButtonElement>;
  onLike: MouseEventHandler<HTMLButtonElement>;
}

export const Card = ({ isLiked, onRemove, onLike, children, ...props }: Props) => (
  <div
    {...props}
    className='relative h-[350px] w-70
      flex flex-col items-center
      cursor-pointer
      rounded-md overflow-hidden
      shadow-md hover:shadow-xl
      transition-shadow'
  > 
    <button
      onClick={onRemove}
      className="absolute top-1 right-1 text-gray-400 z-10"
    >
      <Cross />
    </button>
    {children}
    <button
      onClick={onLike}
      className="absolute bottom-3 right-3 text-red-400 hover:text-red-500"
    >
      {isLiked ? <HeartFilled /> : <Heart />}
    </button>
  </div>
);

interface CardPartProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> { }

Card.Title = ({ children }: CardPartProps) => (
  <h2 className="font-bold mx-4 text-center min-h-12">{children}</h2>
);

Card.Body = ({ children }: CardPartProps) => (
  <div className="px-4">
    <div className="line-clamp-4">
      {children}
    </div>
  </div>
);

interface CardImageProps extends CardPartProps {
  src: string | undefined;
  alt: string;
}

Card.Image = ({ src, alt }: CardImageProps) => (
  <div className="h-1/2">
    <img className="h-full" src={src} alt={alt} />
  </div>
);