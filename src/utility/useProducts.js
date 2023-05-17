import { useContext } from "react";
import { productContext } from "../context/ProductsContext";

const useProducts = () => {
  return useContext(productContext);
};

export default useProducts;
