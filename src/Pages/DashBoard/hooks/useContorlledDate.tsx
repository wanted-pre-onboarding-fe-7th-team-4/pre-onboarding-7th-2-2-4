import { useEffect, useState } from "react";

const useContorlledDate = () => {
  const now = Date.now();
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [stringDate, setStringDate] = useState<string>("");
  const [selectDate, setSelectDate] = useState<string>("");

  const calculateDate = (time: number | string) => {
    const newDate = new Date(time);
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    setDate(date);
    setMonth(month);
    setYear(year);
  };

  const dateToStringForDateFicker = (
    year: number,
    month: number,
    date: number
  ) => {
    setStringDate(
      `${year}-${month < 10 ? "0" + month : month}-${
        date < 10 ? "0" + date : date
      }`
    );
    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    calculateDate(now);
  }, []);

  useEffect(() => {
    if (selectDate) {
      calculateDate(selectDate);
    }
  }, [selectDate]);

  useEffect(() => {
    if (year && date && month) {
      dateToStringForDateFicker(year, month, date);
    }
  }, [date, month, year]);

  return {
    selectDate,
    setSelectDate,
    dateToStringForDateFicker,
    date,
    month,
    year,
    calculateDate,
    stringDate
  };
};

export default useContorlledDate;
