import React, { useState } from "react";
import DashBoradSquer from "@/Components/Header/DashBoradSquer";
import styled from "styled-components";
import DateRangePicker from "@/Components/Button/DatePicker";
import useContorlledDate from "./hooks/useContorlledDate";

const DashBoardTitleSelectDateContainer = () => {
  const { selectDate, setSelectDate } = useContorlledDate();
  const [startDate, endDate] = selectDate;

  const [isDatePickerInfoMessage, setIsDatePickerInfoMessage] = useState(false);

  const onChangeDate = (start: Date | null, end: Date | null) => {
    setSelectDate([start, end]);
  };

  return (
    <Container>
      <Title>대시보드</Title>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChangeDate={onChangeDate}
        onMouseEnter={() => setIsDatePickerInfoMessage(true)}
        onMouseLeave={() => setIsDatePickerInfoMessage(false)}
        isDatePickerInfoMessage={isDatePickerInfoMessage}
      />
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
