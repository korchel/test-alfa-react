import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { FC } from "react";
import toast from "react-hot-toast";

import { remove } from "../store/productsSlice";
import { Button, Modal } from "./ui";
import { deleteProduct } from "../api/products";

interface Props {
  closeModal: () => void;
  productId: number;
}

export const DeleteModal: FC<Props> = ({ closeModal, productId }) => {
  const dispatch = useDispatch();

  const hadleRemove = () => {
    const promise = deleteProduct(productId)
      .then(() => {
        dispatch(remove({ id: productId }));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeModal();
      });
      toast.promise(promise, {
        loading: "In process...",
        error: 'An error occured',
        success: 'Item successfully removed',
      });
  };

  const modal = (
    <Modal closeModal={closeModal}>
      <div className="mb-5 mx-auto font-semibold">
        Are you sure you want to remove this product?
      </div>
      <div className="flex justify-between">
        <Button
          variant='outline'
          onClick={() => { closeModal(); }}
        >
          Cancel
        </Button>
        <Button
          variant='danger'
          onClick={hadleRemove}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
  return createPortal(modal, document.getElementById('modal') as HTMLElement);
};