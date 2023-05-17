import { Link } from "react-router-dom";
import useProducts from "../utility/useProducts";

const Profile = () => {
  const { authToken, registeredUser } = useProducts();
  const user = registeredUser?.find((user) => user?.id === authToken);

  return (
    <div className="px-8 py-4 min-h-[calc(100vh-60px)] bg-gray-200">
      <div className="flex justify-between flex-wrap items-center">
        <p className="text-2xl text-gray-700">Hello, {user?.name}</p>
        <Link to="/update-profile">
          <button className="text-xl border-[2px] border-green-600 p-2">
            Update Profile
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap justify-between gap-4 items-center mt-10">
        <div className="flex-col gap-4 flex">
          <p className="text-xl font-bold underline flex-1">Name</p>
          <p className="text-xl text-gray-700">{user?.name}</p>
        </div>
        <div className="flex-col gap-4 flex">
          <p className="text-xl font-bold underline flex-1">Username</p>
          <p className="text-xl text-gray-700">{user?.username}</p>
        </div>
        <div className="flex-col gap-4 flex">
          <p className="text-xl font-bold underline flex-1">Address</p>
          <p className="text-xl text-gray-700">
            {user?.address ? user?.address : "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
