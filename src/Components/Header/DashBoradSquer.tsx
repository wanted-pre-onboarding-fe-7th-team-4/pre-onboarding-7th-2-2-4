import React, { ReactNode } from "react";
import styled from "styled-components";

interface IDashBoradSquerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const DashBoradSquer = ({ children, ...props }: IDashBoradSquerProps) => {
  return <Container {...props}>{children}</Container>;
};

export default DashBoradSquer;

const Container = styled.div`
  padding: 2rem 4rem;
`;
