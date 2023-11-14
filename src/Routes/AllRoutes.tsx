import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Videos from "../Pages/Videos";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video/:id" element={<Videos />} />
    </Routes>
  );
};

export default AllRoutes;
