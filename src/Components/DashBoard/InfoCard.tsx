import React from "react";
import styled from "styled-components";

interface Props {
  valueName: string;
  rangeTotal: string;
  change: string;
}

const InfoCard = ({ valueName, rangeTotal, change }: Props) => {
  return (
    <Containter>
      <h3>{valueName}</h3>

      <ValueContainer>
        <p>{rangeTotal}</p>
        <p>{change}</p>
      </ValueContainer>
    </Containter>
  );
};

export default InfoCard;

const Containter = styled.div`
  width: 1fr;
  padding: 18px 18px 18px 40px;
  border: 1px solid ${({ theme }) => theme.color.grey_50};
  border-radius: 10px;
  & > h3 {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.grey_300};
  }
`;

const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 10px;
  & > p {
    font-size: 16px;
    font-weight: 700;
  }
`;
