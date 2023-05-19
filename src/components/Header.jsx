import SearchBar from "./SearchBar";
import shoppingCart from "../assets/shopping_cart.png";
import useProducts from "../utility/useProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const cardRef = useRef(null);
  const location = useLocation();
  const { authToken, registeredUser, setAuthToken, cartItem, setCartItem } =
    useProducts();
  const [card, setCard] = useState(false);
  const navigate = useNavigate();

  const authUser = registeredUser?.find((user) => user?.id === authToken);
  const isAdmin = authUser?.isAdmin;

  let hideSearchBar =
    location.pathname === "/cart" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/update-profile";

  const user = registeredUser?.find((user) => authToken === user?.id);

  const handleClickOutside = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setCard(false);
    }
  };

  // Close Card Modal on Outside Click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // logout currenr user
  const handleLogout = () => {
    setAuthToken("");
    localStorage.removeItem("token");
    const storedItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    setCartItem([...storedItems]);
    setCard(false);
    navigate("/");
  };

  return (
    <div className="bg-black text-white flex items-center justify-between px-8 h-[60px]">
      <Link to="/" className="flex-1">
        <h2 className="text-2xl font-bold cursor-pointer text">ECOM.</h2>
      </Link>
      <div className="flex-1 hidden ss:block">{!hideSearchBar && <SearchBar />}</div>
      <div className="flex gap-4 items-center justify-end flex-1 relative">
        <Link to="/cart">
          <div className="relative">
            <img
              src={shoppingCart}
              alt="shopping_bag"
              className="w-[40px] h-[40px] cursor-pointer"
            />
            <p className="absolute h-[25px] bg-red-600 w-[25px] rounded-xl top-0 -right-2 flex justify-center">
              {cartItem?.length}
            </p>
          </div>
        </Link>
        {!authToken && (
          <Link to="/login">
            <button className="text-xl hover:underline">Login</button>
          </Link>
        )}

        {authToken && (
          <div
            className="h-[40px] cursor-pointer w-[40px] flex justify-center items-center rounded-xl border border-white"
            onClick={() => setCard((prevState) => !prevState)}
          >
            <p className="text-xl text-white font-bold">{user?.name[0]}</p>
          </div>
        )}
        {card && (
          <div className="absolute z-40 bg-black top-10 right-0" ref={cardRef}>
            <ul className="p-4 flex flex-col gap-2">
              <Link to="/profile">
                <li
                  onClick={() => setCard((prevState) => !prevState)}
                  className="hover:underline hover:font-bold"
                >
                  Profile
                </li>
              </Link>
              {isAdmin && (
                <Link
                  to="/add-product"
                  onClick={() => setCard((prevState) => !prevState)}
                >
                  <li className="hover:underline hover:font-bold">Add Item</li>
                </Link>
              )}
              <li
                className="hover:underline hover:font-bold cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
