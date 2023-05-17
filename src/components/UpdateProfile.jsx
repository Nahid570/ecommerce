import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toaster from "./Toaster";
import useProducts from "../utility/useProducts";

const UpdateProfile = () => {
  const { registeredUser, authToken, setRegisteredUser } = useProducts();
  const userData = registeredUser?.find((user) => user?.id === authToken);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: userData?.name,
    address: userData?.address,
  });

  const notify = (message) => toast(message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = localStorage.getItem("registeredUsers")
      ? JSON.parse(localStorage.getItem("registeredUsers"))
      : [];

    if (user.name) {
      const indexToUpdate = registeredUser?.findIndex(
        (user) => user?.id === authToken
      );
      if (indexToUpdate != -1) {
        storedData[indexToUpdate].name = user.name;
        storedData[indexToUpdate].address = user.address;
      }
      localStorage.setItem("registeredUsers", JSON.stringify([...storedData]));
      setRegisteredUser([...storedData]);
      navigate("/profile");
    } else {
      notify("name can't be empty!");
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
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
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
          <button
            type="submit"
            className="w-[40%] border border-white p-2 text-white text-xl hover:font-bold cursor-pointer mx-auto"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
