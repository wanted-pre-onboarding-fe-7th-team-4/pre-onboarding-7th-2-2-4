import React, { ReactNode } from "react";
import styled from "styled-components";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <Container>{children}</Container>;
};

export default Main;

const Container = styled.main`
  background-color: ${(props) => props.theme.color.bg_g};
`;
