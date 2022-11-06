import { useState } from "react";

import { Daily } from "@/lib/state/interface";

interface DashBoardData {
  name: string;
  value: string;
}

const useMapDashBoardData = () => {
  const [dashBoard, setDashBoard] = useState<DashBoardData[]>();

  const mappingDailyData = (daily: Daily) => {
    console.log(daily);
    const roas = Math.floor(
      daily.report.daily
        .map((value) => value.roas)
        .reduce((pre, current) => pre + current, 0)
    );
    const cost = Math.floor(
      daily.report.daily
        .map((value) => value.cost)
        .reduce((pre, current) => pre + current, 0) / 10000
    ).toLocaleString("ko-KR");

    const imp = Math.floor(
      daily.report.daily
        .map((value) => value.imp)
        .reduce((pre, current) => pre + current, 0) / 10000
    ).toLocaleString("ko-KR");
    const click = (
      daily.report.daily
        .map((value) => value.click)
        .reduce((pre, current) => pre + current, 0) / 10000
    ).toFixed(1);
    const conv = daily.report.daily
      .map((value) => value.conv)
      .reduce((pre, current) => pre + current, 0)
      .toLocaleString("ko-KR");
    const convValue = (
      daily.report.daily
        .map((value) => value.convValue)
        .reduce((pre, current) => pre + current, 0) / 10000000
    ).toFixed(1);

    const newDataSet = [
      {
        name: "ROAS",
        value: `${roas}%`
      },
      {
        name: "광고비",
        value: `${cost}만 원`
      },
      {
        name: "노출 수",
        value: `${imp}만 회`
      },
      {
        name: "클릭수",
        value: `${click}만 회`
      },
      {
        name: "전환 수",
        value: `${conv}회`
      },
      {
        name: "매출",
        value: `${convValue}억 원`
      }
    ];

    setDashBoard(newDataSet);
  };

  return { dashBoard, mappingDailyData };
};

export default useMapDashBoardData;
