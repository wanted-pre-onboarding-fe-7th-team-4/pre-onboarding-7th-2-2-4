import { useState } from "react";

import { IDaily } from "@/lib/state/interface";

interface DashBoardData {
  name: string;
  value: string;
  beforeThreeDayValue: string;
  isDecrese: boolean;
}

interface PickDateDailyAtom {
  selectData: IDaily[];
  beforeThreeDay: IDaily[];
}

const useMapDashBoardData = () => {
  const [dashBoard, setDashBoard] = useState<DashBoardData[]>();

  const roas = (daily: IDaily[]) => {
    return Math.floor(
      daily
        .map((value) => value.roas)
        .reduce((pre, current) => pre + current / 100, 0)
    );
  };

  const cost = (daily: IDaily[]) => {
    return Math.floor(
      daily
        .map((value) => value.cost)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const imp = (daily: IDaily[]) => {
    return Math.floor(
      daily
        .map((value) => value.imp)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const click = (daily: IDaily[]) => {
    const clickValue = daily
      .map((value) => value.click)
      .reduce((pre, current) => pre + current, 0);
    return clickValue < 10000 ? clickValue : clickValue / 10000;
  };

  const conv = (daily: IDaily[]) => {
    return daily
      .map((value) => value.conv)
      .reduce((pre, current) => pre + current, 0);
  };

  const convValue = (daily: IDaily[]) => {
    return (
      daily
        .map((value) => value.convValue)
        .reduce((pre, current) => pre + current, 0) / 10000000
    );
  };

  const mappingDailyData = (daily: PickDateDailyAtom) => {
    const roasWeek = roas(daily.selectData);
    const roasBefore = roas(daily.beforeThreeDay);
    const costWeek = cost(daily.selectData);
    const costBefore = cost(daily.beforeThreeDay);
    const impWeek = imp(daily.selectData);
    const impBefore = imp(daily.beforeThreeDay);
    const clickWeek = click(daily.selectData);
    const clickBefore = click(daily.beforeThreeDay);
    const convWeek = conv(daily.selectData);
    const convBefore = conv(daily.beforeThreeDay);
    const convValueWeek = convValue(daily.selectData);
    const convValueBefore = convValue(daily.beforeThreeDay);

    const newDataSet = [
      {
        name: "ROAS",
        value: `${roasWeek}%`,
        beforeThreeDayValue: `${Math.abs(Math.floor(roasBefore - roasWeek))}%`,
        isDecrese: roasBefore - roasWeek > 0
      },
      {
        name: "광고비",
        value: `${costWeek.toLocaleString("ko-KR")} 만 원`,
        beforeThreeDayValue: `${Math.abs(costBefore - costWeek).toLocaleString(
          "ko-KR"
        )} 만 원`,
        isDecrese: costBefore - costWeek > 0
      },
      {
        name: "노출 수",
        value: `${impWeek} 만 회`,
        beforeThreeDayValue: `${Math.abs(impBefore - impWeek).toLocaleString(
          "ko-KR"
        )} 만 회`,
        isDecrese: impBefore - impWeek > 0
      },
      {
        name: "클릭수",
        value: clickWeek < 10000 ? `${clickWeek} 회` : `${clickWeek} 만 회`,
        beforeThreeDayValue:
          clickBefore - clickWeek < 10000
            ? `${Math.abs(clickBefore - clickWeek).toFixed(1)} 회`
            : `${Math.abs(clickBefore - clickWeek).toFixed(1)} 만 회`,
        isDecrese: clickBefore - clickWeek > 0
      },
      {
        name: "전환 수",
        value: `${convWeek} 회`,
        beforeThreeDayValue: `${Math.abs(convBefore - convWeek).toLocaleString(
          "ko-KR"
        )} 회`,
        isDecrese: convBefore - convWeek > 0
      },
      {
        name: "매출",
        value: `${convValueWeek.toFixed(1)} 억 원`,
        beforeThreeDayValue: `${Math.abs(
          convValueBefore - convValueWeek
        ).toFixed(1)} 억 원`,
        isDecrese: convValueBefore - convValueWeek > 0
      }
    ];

    setDashBoard(newDataSet);
  };

  return { dashBoard, mappingDailyData };
};

export default useMapDashBoardData;
