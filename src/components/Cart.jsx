import { Link } from "react-router-dom";
import useProducts from "../utility/useProducts";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { cartItem } = useProducts();

  const totalPrice = cartItem?.reduce((acc, curr) => (acc += curr.price), 0);

  return (
    <div className="px-8 py-4 min-h-[calc(100vh-60px)] bg-gray-200">
      <div>
        <h2 className="text-center text-3xl font-bold text-gray-700 underline">
          Your Cart
        </h2>
        {cartItem.length > 0 && (
          <div className="flex flex-wrap justify-between">
            <h3 className="text-xl">Total Items: {cartItem?.length}</h3>
            <h3 className="text-xl">Total Cost: ${parseFloat(totalPrice).toFixed(2)}</h3>
          </div>
        )}
      </div>
      <div className="mt-4">
        {cartItem.length === 0 ? (
          <div>
            <h2 className="text-2xl flex items-center justify-center mt-8 text-gray-700">
              Sorry, there is no item in your Cart!
            </h2>
            <Link to="/">
              <p className="text-center underline text-xl text-gray-700">
                Add Some...
              </p>
            </Link>
          </div>
        ) : (
          cartItem.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
