import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./storeRedux/productSlice.js";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const error = useSelector((state) => state.product.error);
  const isLoading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Shop>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!isLoading &&
          !error &&
          products.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
      </Shop>
    </>
  );
}

export default App;
