import React from "react";
import styled from "styled-components";
import DashBoardContents from "./DashBoardContents";
import DashBoardTitleSelectDateContainer from "./DashBoardTitleSelectDateContainer";
import DashBoardUserStateContainer from "./DashBoardUserStateContainer";

const DashBoard = () => {
  return (
    <Container>
      <DashBoardUserStateContainer />
      <DashBoardTitleSelectDateContainer />
      <DashBoardContents />
    </Container>
  );
};

export default DashBoard;

const Container = styled.div``;
