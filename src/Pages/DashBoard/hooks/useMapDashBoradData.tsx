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
    const valueLength = daily.length;
    return Math.floor(
      daily
        .map((value) => value.roas)
        .reduce((pre, current) => pre + current / valueLength, 0)
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
        name: "?????????",
        value: `${costWeek.toLocaleString("ko-KR")} ??? ???`,
        beforeThreeDayValue: `${Math.abs(costBefore - costWeek).toLocaleString(
          "ko-KR"
        )} ??? ???`,
        isDecrese: costBefore - costWeek > 0
      },
      {
        name: "?????? ???",
        value: `${impWeek} ??? ???`,
        beforeThreeDayValue: `${Math.abs(impBefore - impWeek).toLocaleString(
          "ko-KR"
        )} ??? ???`,
        isDecrese: impBefore - impWeek > 0
      },
      {
        name: "?????????",
        value: clickWeek < 10000 ? `${clickWeek} ???` : `${clickWeek} ??? ???`,
        beforeThreeDayValue:
          clickBefore - clickWeek < 10000
            ? `${Math.abs(clickBefore - clickWeek).toFixed(1)} ???`
            : `${Math.abs(clickBefore - clickWeek).toFixed(1)} ??? ???`,
        isDecrese: clickBefore - clickWeek > 0
      },
      {
        name: "?????? ???",
        value: `${convWeek} ???`,
        beforeThreeDayValue: `${Math.abs(convBefore - convWeek).toLocaleString(
          "ko-KR"
        )} ???`,
        isDecrese: convBefore - convWeek > 0
      },
      {
        name: "??????",
        value: `${convValueWeek.toFixed(1)} ??? ???`,
        beforeThreeDayValue: `${Math.abs(
          convValueBefore - convValueWeek
        ).toFixed(1)} ??? ???`,
        isDecrese: convValueBefore - convValueWeek > 0
      }
    ];

    setDashBoard(newDataSet);
  };

  return { dashBoard, mappingDailyData };
};

export default useMapDashBoardData;
