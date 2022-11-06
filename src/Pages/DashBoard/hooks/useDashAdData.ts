import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { dateAtom } from "@/lib/state/date";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import useGetDaily from "./useGetDaily";
import { IDaily } from "../../../lib/state/interface";
import { convertUTCTimeToCustomString } from "@/lib/utils/convertUTCTimeToCustomString";
import { currentDataAtom, previewDataAtom } from "@/lib/state/daily";
dayjs.extend(isBetween);

const useDashAdData = () => {
  const { daily } = useGetDaily();

  const [currentList, setCurrentList] =
    useRecoilState<IDaily[]>(currentDataAtom);
  const [prevList, setPrevList] = useRecoilState<IDaily[]>(previewDataAtom);

  const date = useRecoilValue(dateAtom);
  const [startDate, endDate] = date;

  const getListByPeriod = (start: string, end: string) => {
    const dataListByPeriod = daily?.report.daily.filter((item) =>
      dayjs(item.date).isBetween(start, end, "day")
    );
    return dataListByPeriod;
  };

  const getCurrentDataList = (startDate: Date | null, endDate: Date | null) => {
    if (startDate && endDate) {
      const filterd = getListByPeriod(
        convertUTCTimeToCustomString(startDate, "yyyy-mm-dd"),
        convertUTCTimeToCustomString(endDate, "yyyy-mm-dd")
      );
      if (filterd) {
        setCurrentList(filterd);
      }
    }
  };

  const getPrevDataList = (startDate: Date | null, endDate: Date | null) => {
    const prevEnd = dayjs(endDate).subtract(1, "d").format("YYYY-MM-DD");
    const diff = dayjs(endDate).diff(startDate);

    const prevStart = dayjs(prevEnd)
      .subtract(diff, "millisecond")
      .format("YYYY-MM-DD");
    const filtered = getListByPeriod(prevStart, prevEnd);
    if (filtered) {
      setPrevList(filtered);
    }
  };

  useEffect(() => {
    getCurrentDataList(startDate, endDate);
    getPrevDataList(startDate, endDate);
  }, [startDate, endDate]);

  return { currentList, prevList, getCurrentDataList, getPrevDataList };
};

export default useDashAdData;
