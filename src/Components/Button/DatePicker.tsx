import { dateAtom } from "@/lib/state/date";
import { convertUTCTimeToCustomString } from "@/lib/utils/convertUTCTimeToCustomString";
import ko from "date-fns/locale/ko";

import { useCallback, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSetRecoilState } from "recoil";

import styled, { css } from "styled-components";

registerLocale("ko", ko);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  startDate: Date | null;
  endDate: Date | null;
  onChangeDate: (start: Date | null, end: Date | null) => void;
  isDatePickerInfoMessage: boolean;
}

interface DatePickerPropsForStyledComponents {
  isDatePickerInfoMessage: boolean;
  show?: boolean;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onChangeDate,
  ...props
}: Props) => {
  const setDate = useSetRecoilState(dateAtom);
  const [dateValue, setDateValue] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const onChange = useCallback(
    (range: [Date | null, Date | null]) => {
      const [start, end] = range;
      onChangeDate(start, end);
    },
    [onChangeDate]
  );

  useEffect(() => {
    if (startDate && endDate) {
      const startDateString = convertUTCTimeToCustomString(startDate, "ko");
      const endDateString = convertUTCTimeToCustomString(endDate, "ko");
      const startDateStringForFilteringData = convertUTCTimeToCustomString(
        startDate,
        "yyyy-mm-dd"
      );
      const endDateStringForFilteringData = convertUTCTimeToCustomString(
        endDate,
        "yyyy-mm-dd"
      );
      setDate([startDateStringForFilteringData, endDateStringForFilteringData]);
      setDateValue(`${startDateString}~${endDateString}`);
    }
  }, [endDate, startDate]);

  return (
    <DatePickerContainer {...props} show={showCalendar}>
      <button
        className="datePickerButton"
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        <span>{dateValue}</span>
      </button>
      {showCalendar && (
        <DatePicker
          locale={"ko"}
          className="datePicker"
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      )}
    </DatePickerContainer>
  );
};

export default DateRangePicker;

const DatePickerContainer = styled.div<DatePickerPropsForStyledComponents>`
  position: relative;

  &::before {
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
    top: -4rem;
    left: -2rem;

    content: "시작 날짜를 클릭 후 범위를 선택해주세요.";
  }
  .react-datepicker__navigation {
    top: 1.6rem;
  }
  .datePickerButton {
    outline: none;
    background-color: transparent;
    padding-right: 34px;
    position: relative;
    font-weight: 500;
    font-size: 14px;
    border: 0;
    &::after {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      background-image: url("/icons/icon_down.svg");
      right: 0;
      top: 0;
      transform: ${({ show }) =>
        show
          ? "rotate(180deg) translate3d(0, 10%, 0);"
          : "rotate(0) translate3d(0, -10%, 0);"};
    }
  }
  .react-datepicker__month-container {
    width: 100%;
    border: 0;
    border-radius: 2rem;
    background-color: unset;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .react-datepicker {
    width: 268px;
    position: absolute;
    z-index: 10;
    right: 0;
    top: 30px;
    border: 0;
    border-radius: 2rem;
  }

  .react-datepicker__header {
    border: 0;
    border-radius: 2rem 2rem 0 0;
    font-size: 1.4rem;
    padding: 1rem 0 1.2rem;
    background-color: ${(props) => props.theme.color.bg_g};
    .react-datepicker__current-month {
      color: ${(props) => props.theme.color.grey_800};
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }
  }
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2rem;
    color: ${(props) => props.theme.color.grey_300};
  }
  .react-datepicker__month {
    font-size: 1.4rem;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-range {
    box-sizing: border-box;
    font-size: 1.4rem;
    padding: 0.1rem;
    color: ${(props) => props.theme.color.bg_w};
    background-color: ${(props) => props.theme.color.secondary_02};
  }
`;
