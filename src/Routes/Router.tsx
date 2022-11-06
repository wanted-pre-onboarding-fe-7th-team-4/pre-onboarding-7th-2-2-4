import React from "react";
import MainLayout from "@/Components/Layout/MainLayout";
import DashBoard from "@/Pages/DashBoard/DashBoard";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="ad-manage" />
      </Route>
    </Routes>
  );
};

export default Router;
