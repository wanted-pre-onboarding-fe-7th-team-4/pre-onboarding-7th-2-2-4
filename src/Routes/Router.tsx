import MainLayout from "@/Components/Layout/MainLayout";
import React from "react";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="dash-board" />
        <Route path="ad-manage" />
      </Route>
    </Routes>
  );
};

export default Router;
