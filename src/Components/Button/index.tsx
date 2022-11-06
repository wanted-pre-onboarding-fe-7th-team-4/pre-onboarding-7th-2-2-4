import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
}
export default function Button({ text }: Props) {
  return <ButtonContainer>{text}</ButtonContainer>;
}

const ButtonContainer = styled.button`
  display: block;
  width: 92px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.color.grey_100};
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.bg_w};
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.color.grey_800};
`;
