/* eslint-disable react/prop-types */
import useProducts from "../utility/useProducts";
import updateIcon from "../assets/update_icon.png";
import deleteIcon from "../assets/delete_icon.png";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { Link } from "react-router-dom";

const Product = ({ item, isAdmin }) => {
  const { cartItem, setCartItem, authToken } = useProducts();
  const [deleteProduct] = useDeleteProduct();
  const addToCart = (product) => {
    const localData = localStorage.getItem(authToken ? authToken : "cartItems")
      ? JSON.parse(localStorage.getItem(authToken ? authToken : "cartItems"))
      : [];
    localStorage.setItem(
      authToken ? authToken : "cartItems",
      JSON.stringify([...localData, product])
    );
    setCartItem([...localData, product]);
  };

  const isInCart = (id) => {
    return cartItem.find((item) => id === item.id);
  };

  return (
    <div
      key={item.id}
      className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between hover:scale-105 transition-all duration-500 delay-100"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full mb-4 h-[300px] object-contain"
      />
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-bold text-xl">${item.price}</p>
        {isAdmin && (
          <div className="flex gap-4">
            <Link to={"/add-product"} state={{ update: true, id: item.id }}>
              <img
                src={updateIcon}
                alt="update_icon"
                className="h-[35px] w-[35px] cursor-pointer"
              />
            </Link>
            <img
              src={deleteIcon}
              alt="delete_icon"
              className="h-[35px] w-[35px] cursor-pointer"
              onClick={() => deleteProduct(item.id)}
            />
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p>{item.description.substr(0, 100)}...</p>
      {isInCart(item.id) ? (
        <button className="bg-black text-white px-4 py-2 mt-4 rounded-md cursor-not-allowed">
          In Cart
        </button>
      ) : (
        <button
          className="bg-black text-white px-4 py-2 mt-4 rounded-md hover:font-bold transition-all delay-150"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
