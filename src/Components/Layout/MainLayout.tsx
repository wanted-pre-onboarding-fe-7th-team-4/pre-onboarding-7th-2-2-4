import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";
import Main from "../Main/Main";

const MainLayout = () => {
  return (
    <Layout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
};

export default MainLayout;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(32rem, 32rem) minmax(102rem, auto);
  min-height: 100vh;
`;
