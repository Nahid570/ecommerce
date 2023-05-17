import ProductsContext from "./context/ProductsContext";
import Router from "./utility/Router";

const App = () => {
  return (
    <ProductsContext>
      <Router />
    </ProductsContext>
  );
};

export default App;
