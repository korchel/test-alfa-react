import { DetailedHTMLProps, FC, HTMLAttributes, MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "../interfaces/product";
import { cn } from "../lib/utils";
import { Card } from "./ui";
import { toggleFavorite } from "../store/productsSlice";
import { DeleteModal } from "./DeleteModal";

interface Props  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  product: IProduct;
  className?: string;
}

export const ProductCard: FC<Props> = ({ product, className, ...props }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { id, title, thumbnail, description, isFavorite } = product;

  const handleLike: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleFavorite({ id }));
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        className={cn(className)}
        onLike={handleLike}
        onRemove={handleRemove}
        isLiked={isFavorite}
        {...props}
      >
        <Card.Image src={thumbnail} alt={title} />
        <Card.Title>{title}</Card.Title>
        <Card.Body>{description}</Card.Body>
      </Card>
      {isModalOpen && (
        <DeleteModal
          productId={id}
          closeModal={() => { setIsModalOpen(false); }}
        />
      )}
    </>
  );
};
