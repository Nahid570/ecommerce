import useProducts from "../utility/useProducts";

export const useDeleteProduct = () => {
  const { products, setProducts } = useProducts();
  const deleteProduct = (productToDelete) => {
    const productIndex = products.findIndex(
      (item) => item.id === productToDelete
    );
    if (productIndex != -1) {
      const localItems = JSON.parse(localStorage.getItem("products"));
      localItems.splice(productIndex, 1);
      localStorage.setItem("products", JSON.stringify([...localItems]));
      setProducts([...localItems]);
    }
  };
  return [deleteProduct];
};
