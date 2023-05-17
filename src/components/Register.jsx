import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toaster from "./Toaster";
import useProducts from "../utility/useProducts";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const { registeredUser, setRegisteredUser } = useProducts();
  const userRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    address: "",
    password: "",
  });

  const notify = (message) => toast(message);

  // Focus on user input when component mount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // check for existing user
  let userExistence = (username) => {
    let findUser = registeredUser.find((user) =>
      user.username.toLowerCase().includes(username.toLowerCase())
    );
    return findUser ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check user already exists or not ?
    if (user.username && userExistence(user.username)) {
      notify("Sorry, user already exists!");
      return;
    }

    const storedData = localStorage.getItem("registeredUsers")
      ? JSON.parse(localStorage.getItem("registeredUsers"))
      : [];

    if (user.name && user.username && user.password) {
      user.id = uuidv4();
      if (registeredUser.length === 0) {
        user.isAdmin = true;
      }
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify([...storedData, user])
      );
      setRegisteredUser([...storedData, user]);
      setUser({
        name: "",
        username: "",
        address: "",
        password: "",
      });
      navigate("/login");
      notify("Hurray, your account created");
    } else {
      notify("name,username and password are required!");
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
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
          />
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
          />
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Address"
            className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent outline-none p-4 border border-white text-white text-xl placeholder-white"
          />
          <button
            type="submit"
            className="w-[40%] border border-white p-2 text-white text-xl hover:font-bold cursor-pointer mx-auto"
          >
            Register
          </button>
          <p className="text-xl text-center text-white">
            Already user?{" "}
            <Link to="/login">
              <small className="text-xl underline text-black">Login</small>
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
