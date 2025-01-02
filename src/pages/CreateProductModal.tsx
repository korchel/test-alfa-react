import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { Modal } from "../components/ui";
import { ProductForm } from "../components";
import { ICreateProduct } from "../interfaces/product";
import { addProduct } from "../api/products";
import { add } from "../store/productsSlice";
import { routes } from "../routes";

export const CreateProductModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const closeModal = () => {
    navigate(-1)
  };

  const onCreateSubmit = (data: ICreateProduct) => {
    const promise = addProduct(data)
      .then((response) => {
        dispatch(add({...data, id: response.id, isFavorite: false }));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        navigate(routes.productsPage());
      });
    toast.promise(promise, {
      loading: "In process...",
      error: 'An error occured',
      success: 'Item successfully created',
    });
  };

  return (
    <Modal closeModal={closeModal}>
      <ProductForm onSubmitFunction={onCreateSubmit} />
    </Modal>
  );
};