/* eslint-disable react/prop-types */
import useProducts from "../utility/useProducts";

const Product = ({ item }) => {
  const { cartItem, setCartItem } = useProducts();

  const addToCart = (product) => {
    const localData = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    localStorage.setItem("cartItems", JSON.stringify([...localData, product]));
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
      <p className="text-gray-600 font-bold text-xl">${item.price}</p>
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
