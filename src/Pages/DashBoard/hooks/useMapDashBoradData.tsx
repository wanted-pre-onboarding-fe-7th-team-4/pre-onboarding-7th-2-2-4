import { useState } from "react";

import { Daily } from "@/lib/state/interface";

interface DashBoardData {
  name: string;
  value: string;
  beforeThreeDayValue: string;
  isDecrese: boolean;
}

interface PickDateDailyAtom {
  week: Daily;
  beforeThreeDay: Daily;
}

const useMapDashBoardData = () => {
  const [dashBoard, setDashBoard] = useState<DashBoardData[]>();

  const roas = (daily: Daily["report"]["daily"]) => {
    return Math.floor(
      daily
        .map((value) => value.roas)
        .reduce((pre, current) => pre + current, 0)
    );
  };

  const cost = (daily: Daily["report"]["daily"]) => {
    return Math.floor(
      daily
        .map((value) => value.cost)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const imp = (daily: Daily["report"]["daily"]) => {
    return Math.floor(
      daily
        .map((value) => value.imp)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const click = (daily: Daily["report"]["daily"]) => {
    return (
      daily
        .map((value) => value.click)
        .reduce((pre, current) => pre + current, 0) / 10000
    );
  };

  const conv = (daily: Daily["report"]["daily"]) => {
    return daily
      .map((value) => value.conv)
      .reduce((pre, current) => pre + current, 0);
  };

  const convValue = (daily: Daily["report"]["daily"]) => {
    return (
      daily
        .map((value) => value.convValue)
        .reduce((pre, current) => pre + current, 0) / 10000000
    );
  };

  const mappingDailyData = (daily: PickDateDailyAtom) => {
    const roasWeek = roas(daily.week.report.daily);
    const roasBefore = roas(daily.beforeThreeDay.report.daily);
    const costWeek = cost(daily.week.report.daily);
    const costBefore = cost(daily.beforeThreeDay.report.daily);
    const impWeek = imp(daily.week.report.daily);
    const impBefore = imp(daily.beforeThreeDay.report.daily);
    const clickWeek = click(daily.week.report.daily);
    const clickBefore = click(daily.beforeThreeDay.report.daily);
    const convWeek = conv(daily.week.report.daily);
    const convBefore = conv(daily.beforeThreeDay.report.daily);
    const convValueWeek = convValue(daily.week.report.daily);
    const convValueBefore = convValue(daily.beforeThreeDay.report.daily);

    const newDataSet = [
      {
        name: "ROAS",
        value: `${roasWeek}%`,
        beforeThreeDayValue: `${roasBefore}%`,
        isDecrese: roasWeek - roasBefore > 0
      },
      {
        name: "광고비",
        value: `${costWeek}만 원`,
        beforeThreeDayValue: `${costBefore}만 원`,
        isDecrese: costWeek - costBefore > 0
      },
      {
        name: "노출 수",
        value: `${impWeek}만 회`,
        beforeThreeDayValue: `${impBefore}만 회`,
        isDecrese: impWeek - impBefore > 0
      },
      {
        name: "클릭수",
        value: `${clickWeek}만 회`,
        beforeThreeDayValue: `${clickBefore}만 회`,
        isDecrese: clickWeek - clickBefore > 0
      },
      {
        name: "전환 수",
        value: `${convWeek}회`,
        beforeThreeDayValue: `${convBefore}회`,
        isDecrese: convWeek - convBefore > 0
      },
      {
        name: "매출",
        value: `${convValueWeek}억 원`,
        beforeThreeDayValue: `${convValueBefore}억 원`,
        isDecrese: convValueWeek - convValueBefore > 0
      }
    ];

    setDashBoard(newDataSet);
  };

  return { dashBoard, mappingDailyData };
};

export default useMapDashBoardData;
