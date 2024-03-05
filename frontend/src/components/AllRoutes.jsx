import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PagesNotFound from "./PagesNotFound";
import MyProfile from "./MyProfile";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="*" element={<PagesNotFound />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
