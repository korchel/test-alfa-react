import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ProductCard, Container, Filters, NothingFound, Error } from "../components";
import { Grid, Loader } from "../components/ui";
import { routes } from "../routes";
import { getFilteredProducts, getLoadingProductsError, getloadingProductsState } from "../store/productsSlice";
import { getFilters } from "../store/filterSlice";

export const ProductsPage = () => {
  const navigate = useNavigate();

  const filters = useSelector(getFilters);
  const products = useSelector(getFilteredProducts(filters));
  const loadingProductsState = useSelector(getloadingProductsState);
  const loadingError = useSelector(getLoadingProductsError);

  return (
    <Container>
      <div className="flex flex-col sm:flex-row gap-5 my-5">
        <Filters className="w-64 min-w-64" />
        {loadingProductsState === 'loading' && <Loader className="min-h-96" />}
        {loadingError && <Error />}
        {products.length === 0 && loadingProductsState === 'idle' && <NothingFound />}
        <Grid className="flex-1">
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              onClick={() => { navigate(routes.productPage(product.id)); }} //Event propagation won't stop when using Link
            />
          ))}
        </Grid>
      </div>
    </Container>
  );
};
