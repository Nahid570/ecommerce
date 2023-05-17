import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cart from "../components/Cart";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
