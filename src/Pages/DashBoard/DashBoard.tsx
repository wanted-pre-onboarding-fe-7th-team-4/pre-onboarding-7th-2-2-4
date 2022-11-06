import React from "react";
import styled from "styled-components";
import DashBoardContents from "./DashBoardContents";
import DashBoardTitleSelectDateContainer from "./DashBoardTitleSelectDateContainer";
import DashBoardHeader from "./DashBoardUserStateContainer";

const DashBoard = () => {
  return (
    <Container>
      <DashBoardHeader />
      <DashBoardTitleSelectDateContainer />
      <DashBoardContents />
    </Container>
  );
};

export default DashBoard;

const Container = styled.div``;
