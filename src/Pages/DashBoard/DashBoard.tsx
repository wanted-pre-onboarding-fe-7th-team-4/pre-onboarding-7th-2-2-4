import React from "react";
import styled from "styled-components";
import DashBoardContents from "./DashBoardContents";
import DashBoardTitleSelectDateContainer from "./DashBoardTitleSelectDateContainer";

const DashBoard = () => {
  return (
    <Container>
      <DashBoardTitleSelectDateContainer />
      <DashBoardContents />
    </Container>
  );
};

export default DashBoard;

const Container = styled.div``;
