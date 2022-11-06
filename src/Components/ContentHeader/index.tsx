import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export default function ContentHeader({ title }) {
  return (
    <ContentHeaderContainer>
      <h3>{title}</h3>
      {/* 데이트피커 추가 */}
    </ContentHeaderContainer>
  );
}

const ContentHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  height: 80px;
  h3 {
    font-weight: 900;
    font-size: 26px;
    line-height: 30px;
    color: ${(props) => props.theme.color.grey_800};
  }
`;

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired
};
