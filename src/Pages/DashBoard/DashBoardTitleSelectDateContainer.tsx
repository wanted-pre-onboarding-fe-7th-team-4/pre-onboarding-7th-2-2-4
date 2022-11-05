import DashBoradSquer from "@/Components/Header/DashBoradSquer";
import React from "react";
import styled from "styled-components";

interface IDashBoardTitleSelectDateContainerProps {
  date: Date;
}

const DashBoardTitleSelectDateContainer = ({
  date
}: IDashBoardTitleSelectDateContainerProps) => {
  return (
    <DashBoradSquer>
      <Title>대시보드</Title>
      <DateSelectButton>{date.toString()}</DateSelectButton>
    </DashBoradSquer>
  );
};

export default DashBoardTitleSelectDateContainer;

const Title = styled.h1`
  font-size: 2.6rem;
`;

const DateSelectButton = styled.div``;
