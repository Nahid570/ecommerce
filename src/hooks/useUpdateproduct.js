import uploadImage from "../utility/uploadImage";
import useProducts from "../utility/useProducts";

const useUpdateproduct = () => {
  const { products, setProducts } = useProducts();
  const updateProduct = async (formData) => {
    if (typeof formData?.image === "object") {
      let result = await uploadImage(formData?.image);
      formData.image = result?.data?.data?.display_url;
    }

    // Find product Index
    const productIndex = products?.findIndex(
      (item) => item?.id === formData?.id
    );

    if (productIndex != -1) {
      const storedProduct =
        localStorage.getItem("products") &&
        JSON.parse(localStorage.getItem("products"));
      storedProduct[productIndex].title = formData.title;
      storedProduct[productIndex].description = formData.description;
      storedProduct[productIndex].price = formData.price;
      storedProduct[productIndex].rating = formData.rating;
      storedProduct[productIndex].image = formData.image;
      localStorage.setItem("products", JSON.stringify([...storedProduct]));
      setProducts([...storedProduct]);
    }
  };

  return [updateProduct];
};

export default useUpdateproduct;
