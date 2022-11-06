import HeaderBar from "@/Components/Header/HeaderBar";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "../Header/SideMenu";
import Main from "../Main/Main";
const MainLayout = () => {
  return (
    <Layout>
      <SideMenu />
      <Main>
        <HeaderBar />
        <Outlet />
      </Main>
    </Layout>
  );
};

export default MainLayout;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
`;
