/* eslint-disable react/prop-types */
import trashIcon from "../assets/trash_icon.png";
import useProducts from "../utility/useProducts";

const CartProduct = ({ product }) => {
  const { setCartItem } = useProducts();

  const deleteProduct = (id) => {
    const remainingProducts =
      localStorage.getItem("cartItems") &&
      JSON.parse(localStorage.getItem("cartItems")).filter(
        (item) => item.id != id
      );
    localStorage.setItem("cartItems", JSON.stringify(remainingProducts));
    setCartItem(remainingProducts);
  };

  return (
    <div>
      <div className="bg-gray-400 dark:bg-gray-700 h-[0.5px] w-[100%]"></div>
      <div className="flex justify-between p-1 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-[100px] h-[100px] flex-[1] object-contain"
        />
        <div className="flex-[2] text-center">
          <p className="text-gray-700 text-lg font-semibold dark:text-green-500">
            {product.title}
          </p>
          <p className="text-xl font-bold dark:text-green-400">
            ${product.price}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            onClick={() => deleteProduct(product.id)}
            src={trashIcon}
            alt="trash_icon"
            className="cursor-pointer w-[35px] h-[35px]"
          />
        </div>
      </div>
      <div className="bg-gray-400 dark:bg-gray-700 h-[0.5px] w-[100%]"></div>
    </div>
  );
};

export default CartProduct;
