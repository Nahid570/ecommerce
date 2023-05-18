/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { axiosIns } from "../utility/axiosInstance";

export const productContext = createContext();

const registeredUsers = localStorage.getItem("registeredUsers")
  ? JSON.parse(localStorage.getItem("registeredUsers"))
  : [];
let userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";
const storage = localStorage.getItem(userToken ? userToken : "cartItems")
  ? JSON.parse(localStorage.getItem(userToken ? userToken : "cartItems"))
  : [];

const ProductsContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItem, setCartItem] = useState(storage);

  // To avoid additional rendering I'm not going to create another Context to maintain Authenticated user cause when there is a changes in Auth Context my entire product Context will be re-render also. To avoid such scenario I'm not going to do that. To handle such scenario we can use, State Management Library Such as "Redux Toolkit".
  const [registeredUser, setRegisteredUser] = useState(registeredUsers);
  const [authToken, setAuthToken] = useState(userToken);

  useEffect(() => {
    const checkForStoredProducts =
      localStorage.getItem("products") &&
      JSON.parse(localStorage.getItem("products"));
    if (checkForStoredProducts?.length) {
      setProducts([...checkForStoredProducts]);
    } else {
      axiosIns
        .get("/products")
        .then((products) => {
          setProducts(products.data);
          localStorage.setItem("products", JSON.stringify([...products.data]));
        })
        .catch((error) => console.log(error.message));
    }
  }, []);

  // logout user when there is no authToken
  useEffect(() => {}, [authToken]);

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,
        searchTerm,
        setSearchTerm,
        setCartItem,
        cartItem,
        registeredUser,
        setRegisteredUser,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductsContext;
