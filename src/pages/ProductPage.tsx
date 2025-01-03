import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Container, EditModal, Error } from "../components";
import { Button, GoBackButton, Loader, Title } from "../components/ui";
import { edit, getProduct } from "../store/productsSlice";
import { fetchProduct, updateProduct } from "../api/products";
import { ICreateProduct } from "../interfaces/product";

export const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

  const product = useSelector(getProduct(Number(id)));

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const onEditSubmit = (data: ICreateProduct) => {
    const promise = updateProduct(data, product!.id)
      .then(() => {
        dispatch(edit({data, id: product!.id }));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
    toast.promise(promise, {
      loading: "In process...",
      error: 'An error occured',
      success: 'Item successfully edited!',
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchProduct(Number(id))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          setIsError(true);
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      {isError && <Error />}
      <div className="flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden">
        <GoBackButton
          onClick={() => { navigate(-1); }}
          className="fixed top-32 left-10"
        />
        {isLoading && <Loader className='min-h-[615px]' />}
        {product && !isLoading && (
          <>
            <div className="flex-1">
              <img
                className="mx-auto h-full"
                src={product.images?.[0]}
                alt={product.title}
              />
            </div>
            <div className="bg-gray-100 p-5 flex flex-col gap-5 flex-1">
              <div>
                <Title text={product.title} />
                <div className="text-gray-600 text-sm">{product.brand}</div>
                <hr />
              </div>
              <div>
                <Title size='sm' text='Description' />
                <div>{product.description}</div>
              </div>
              <div>
                <Title size='sm' text='Price' />
                <div>{product.price}$</div>
              </div>
              <Button
                variant="outline"
                className="mt-auto"
                onClick={handleEdit}
              >
                Edit product
              </Button>
            </div>
            {isModalOpen && (
              <EditModal
                closeModal={() => setIsModalOpen(false)}
                product={product}
                onEditSubmit={onEditSubmit}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
};