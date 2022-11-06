import React, { useEffect, useState } from "react";
import DashBoradSquer from "@/Components/Header/DashBoradSquer";
import styled, { css } from "styled-components";
import useContorlledDate from "./hooks/useContorlledDate";
import { useSetRecoilState } from "recoil";
import { dateAtom } from "@/lib/state/daily";

const DashBoardTitleSelectDateContainer = () => {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [isDatePickerInfoMessage, setIsDatePickerInfoMessage] = useState(false);
  const setDate = useSetRecoilState(dateAtom);
  const { stringDate, selectDate, setSelectDate, year, month, date } =
    useContorlledDate();

  const handleDatePicker = () => {
    setIsDatePicker((pre) => !pre);
  };

  useEffect(() => {
    if (!selectDate) {
      setDate(stringDate);
      return;
    }
    setDate(selectDate);
  }, [selectDate, stringDate]);

  return (
    <Container>
      <Title>대시보드</Title>
      <div>
        {!isDatePicker ? (
          <DateSelectButton onClick={handleDatePicker}>
            <span>{year}년 </span>
            <span>{month}월 </span>
            <span>{date}일</span>
          </DateSelectButton>
        ) : (
          <DatePicker
            onMouseEnter={() => setIsDatePickerInfoMessage(true)}
            onMouseLeave={() => setIsDatePickerInfoMessage(false)}
            isDatePickerInfoMessage={isDatePickerInfoMessage}
          >
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
            <button onClick={handleDatePicker}>제출</button>
          </DatePicker>
        )}
      </div>
    </Container>
  );
};

export default DashBoardTitleSelectDateContainer;

const Container = styled(DashBoradSquer)`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 900;
`;

const DatePicker = styled.div<{ isDatePickerInfoMessage: boolean }>`
  position: relative;

  &::after {
    ${({ isDatePickerInfoMessage, theme }) => {
      if (isDatePickerInfoMessage) {
        return css`
          visibility: visible;
          background-color: ${theme.color.bg_w};
          padding: 0.8rem 0.4rem;
          border-radius: 1rem; ;
        `;
      }
      return css`
        visibility: hidden;
      `;
    }}
    position: absolute;
    word-break: keep-all;
    top: -5rem;
    left: -5rem;

    content: "시작 날짜를 입력하거나 달력 아이콘을 눌러 날짜를 선택해주세요.";
  }
`;

const DateSelectButton = styled.button``;
