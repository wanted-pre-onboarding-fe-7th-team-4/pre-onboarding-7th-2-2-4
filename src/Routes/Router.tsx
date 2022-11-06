import MainLayout from "@/Components/Layout/MainLayout";
import AdManagement from "@/Pages/AdManagement/AdManage";
import DashBoard from "@/Pages/DashBoard/DashBoard";
import React from "react";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="ad-manage" element={<AdManagement />} />
      </Route>
    </Routes>
  );
};

export default Router;
