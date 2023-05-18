import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useProducts from "../utility/useProducts";
import Toaster from "./Toaster";

const Login = () => {
  const userRef = useRef(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { registeredUser, setAuthToken, setCartItem } = useProducts();
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // check is there is a user
  let userExistence = (username) => {
    let findUser = registeredUser.find((user) =>
      user.username.toLowerCase().includes(username.toLowerCase())
    );
    return findUser;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      notify("username and password are required");
      return;
    }

    if (user.username && user.password) {
      // validate user
      let isUser = userExistence(user.username);
      if (isUser && isUser.password === user.password) {
        localStorage.setItem("token", isUser.id);
        setAuthToken(isUser.id);
        const storedItems = localStorage.getItem(isUser.id)
          ? JSON.parse(localStorage.getItem(isUser.id))
          : [];
        setCartItem([...storedItems]);
        notify("Login success.");
        navigate("/");
      } else {
        notify("Invalid username or password");
      }
    } else {
      notify("Invalid username or password");
    }
  };

  return (
    <>
      <Toaster />
      <div className="px-8 py-4 min-h-[calc(100vh-60px)] flex justify-center items-center bg-gray-500">
        <form
          className="flex flex-col gap-4 w-[100%] sm:w-[60%]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            ref={userRef}
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
          />
          <button
            type="submit"
            className="w-[40%] border border-white p-2 text-white text-xl hover:font-bold cursor-pointer mx-auto"
          >
            Login
          </button>
          <p className="text-xl text-center text-white">
            New here?{" "}
            <Link to="/register">
              <small className="text-xl underline text-black">Register</small>
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
