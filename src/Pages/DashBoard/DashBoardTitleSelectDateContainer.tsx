import React, { useEffect } from "react";
import DashBoradSquer from "@/Components/Header/DashBoradSquer";
import styled from "styled-components";
import useContorlledDate from "./hooks/useContorlledDate";
import { useSetRecoilState } from "recoil";
import { dateAtom } from "@/lib/state/daily";

const DashBoardTitleSelectDateContainer = () => {
  const setDate = useSetRecoilState(dateAtom);
  const { stringDate, selectDate, setSelectDate } = useContorlledDate();

  useEffect(() => {
    if (!selectDate) {
      setDate(stringDate);
      return;
    }
    setDate(selectDate);
  }, [selectDate, stringDate]);

  return (
    <DashBoradSquer>
      <Title>대시보드</Title>
      <div>
        <label htmlFor="startDate">시작 날짜</label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={selectDate ? selectDate : stringDate}
          onChange={(e) => {
            setSelectDate(e.currentTarget.value);
          }}
        />
      </div>
      <DateSelectButton>
        {selectDate ? selectDate : stringDate}
      </DateSelectButton>
    </DashBoradSquer>
  );
};

export default DashBoardTitleSelectDateContainer;

const Title = styled.h1`
  font-size: 2.6rem;
`;

const DateSelectButton = styled.div``;
