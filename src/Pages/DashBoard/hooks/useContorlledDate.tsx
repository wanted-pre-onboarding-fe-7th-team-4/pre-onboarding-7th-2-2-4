import { useEffect, useState } from "react";

const useContorlledDate = () => {
  const [now, setNow] = useState<Date | null>(null);
  const [selectDate, setSelectDate] = useState<[Date | null, Date | null]>([
    null,
    null
  ]);

  const dateStringNumberToDate = (dateNumber: number | string) => {
    const newDate = new Date(dateNumber);
    setNow(newDate);
  };

  useEffect(() => {
    const now = Date.now();
    dateStringNumberToDate(now);
  }, []);

  useEffect(() => {
    if (now) {
      setSelectDate([now, now]);
    }
  }, [now]);

  return {
    selectDate,
    setSelectDate
  };
};

export default useContorlledDate;
