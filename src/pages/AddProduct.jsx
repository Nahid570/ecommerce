import { useEffect, useRef, useState } from "react";
import uploadImage from "../utility/uploadImage";
import { v4 as uuidv4 } from "uuid";
import useProducts from "../utility/useProducts";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateproduct from "../hooks/useUpdateproduct";

const AddProduct = () => {
  const titleRef = useRef(null);
  const { setProducts, products } = useProducts();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const productToUpdate = products?.find((item) => item.id === state?.id);
  const [formData, setFormData] = useState({
    title: state?.update ? productToUpdate?.title : "",
    description: state?.update ? productToUpdate?.description : "",
    price: state?.update ? productToUpdate?.price : "",
    rating: state?.update
      ? productToUpdate?.rating
        ? productToUpdate?.rating
        : productToUpdate?.rating?.rate
      : "",
    image: state?.update ? productToUpdate?.image : null,
  });
  const [updateProduct] = useUpdateproduct();
  const navigate = useNavigate();

  // Focus on title input when component mount
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // This handleSubmit function work for both product Add and product Update simultaneously
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading((prevState) => !prevState);
    // product Update logic
    if (state?.update) {
      formData.id = state?.id;
      updateProduct(formData);
      navigate("/");
      return;
    }
    // End of product update

    let result = await uploadImage(formData.image);

    if (result?.data?.success) {
      const newProduct = {
        id: uuidv4(),
        title: formData.title,
        description: formData.description,
        price: formData.price,
        rating: formData.rating,
        image: result.data.data.display_url,
      };
      const storedProducts = localStorage.getItem("products")
        ? JSON.parse(localStorage.getItem("products"))
        : [];
      setProducts([newProduct, ...storedProducts]);
      localStorage.setItem(
        "products",
        JSON.stringify([newProduct, ...storedProducts])
      );
      setFormData({
        title: "",
        description: "",
        price: "",
        rating: "",
        image: null,
      });
      navigate("/");
    }
  };

  return (
    <div className="px-8 py-4 min-h-[calc(100vh-60px)] flex flex-col gap-8 justify-center items-center bg-gray-500">
      <form
        className="flex flex-col gap-4 w-[100%] sm:w-[60%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          required
          ref={titleRef}
          name="title"
          value={formData?.title}
          onChange={handleChange}
          placeholder="Title"
          className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
        />
        <textarea
          type="text"
          required
          name="description"
          value={formData?.description}
          onChange={handleChange}
          placeholder="Description..."
          className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
        />
        <input
          type="number"
          placeholder="Price"
          required
          name="price"
          value={formData?.price}
          onChange={handleChange}
          className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
        />
        <input
          type="number"
          placeholder="Rating"
          required
          value={formData.rating}
          onChange={handleChange}
          name="rating"
          className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
        />
        <input
          type="file"
          name="image"
          required={!state?.update}
          accept="image/*"
          onChange={handleChange}
          className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
        />
        {!state?.update ? (
          <button
            type="submit"
            className="w-[40%] border border-white p-2 text-white text-xl hover:font-bold cursor-pointer mx-auto"
          >
            {!loading ? "Add Product" : "Loading..."}
          </button>
        ) : (
          <button
            type="submit"
            className="w-[40%] border border-white p-2 text-white text-xl hover:font-bold cursor-pointer mx-auto"
          >
            {!loading ? "Update product" : "Loading..."}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
