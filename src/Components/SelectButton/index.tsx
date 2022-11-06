import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export default function SelectButton({ onChange, children, value }) {
  return (
    <SelectContainer onChange={onChange} value={value}>
      {children}
    </SelectContainer>
  );
}

const SelectContainer = styled.select`
  width: 123px;
  height: 40px;
  margin-right: 10px;
  border: 1px solid ${(props) => props.theme.color.grey_100};
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.color.grey_800};
`;

SelectButton.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node
};
