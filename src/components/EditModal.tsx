import { createPortal } from "react-dom";
import { Modal } from "./ui";
import { ProductForm } from "./ProductForm";
import { ICreateProduct, IProduct } from "../interfaces/product";
import { FC } from "react";

interface Props {
  product: IProduct;
  closeModal: VoidFunction;
  onEditSubmit: (data: ICreateProduct) => void;
}

export const EditModal: FC<Props> = ({ product, closeModal, onEditSubmit }) => {
  const modal = (
    <Modal closeModal={closeModal}>
      <ProductForm defaultValues={product} onSubmitFunction={onEditSubmit} />
    </Modal>
  );
  return createPortal(modal, document.getElementById('modal') as HTMLElement);
};