import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { ProductPage, ProductsPage, NotFoundPage, CreateProductModal } from "./pages";
import { Layout } from "./components";
import { routes } from "./routes";
import { AppDispatchType } from "./store";
import { fetchAll } from "./store/productsSlice";
import { fetchCategoriesData } from "./store/categoriesSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatchType>();
  const previousLocation = location.state?.previousLocation;

  useEffect(() => {                 // Workaround to avoid fetching data on the page and losing favorite and deleted products
    dispatch(fetchAll());
    dispatch(fetchCategoriesData());
  }, []);

  return (
    <Layout>
      <Routes location={previousLocation || location}>
        <Route path='/' element={<Navigate to={routes.productsPage()} replace={true} />} />
        <Route path={routes.productsPage()} element={<ProductsPage />} />
        <Route path={routes.productsPage() + '/:id'} element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path={routes.createProduct()} element={<CreateProductModal />} />
        </Routes>
      )}
    </Layout>
  );
};

export default App;