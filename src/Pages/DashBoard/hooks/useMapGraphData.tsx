import { Daily, DailyKeySet } from "@/lib/state/interface";
import { useState } from "react";
import { ApexOptions } from "apexcharts";

interface ChartState {
  options: ApexOptions;
  series: ApexOptions["series"];
}

const state: ChartState = {
  options: {
    chart: {
      id: "advertisement-line-chart"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#4FADF7"
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#85DA47"
        }
      }
    ],
    dataLabels: {
      enabled: false
    },
    colors: ["#4FADF7", "#85DA47"]
  },

  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
};

interface SeriesName {
  name: string;
  value: DailyKeySet;
}

const useMapGraphData = () => {
  const [chartState, setChartState] = useState<ChartState>(state);

  const mappingCategories = (data: Daily) => {
    const categories = data.report.daily.map((value) => {
      const [month, date] = value.date.split("-").slice(1);
      return `${month}월 ${date}일`;
    });

    setChartState((pre) => ({
      ...pre,
      options: { ...pre.options, xaxis: { categories } }
    }));
  };

  const changeDataKeyNameToDataSetName = (name: string) => {
    const seriesName: SeriesName[] = [
      { name: "ROAS", value: "roas" },
      { name: "광고비", value: "cost" },
      { name: "노출 수", value: "imp" },
      { name: "클릭수", value: "click" },
      { name: "전환 수", value: "conv" },
      { name: "매출", value: "convValue" }
    ];

    return seriesName.find((value) => value.name === name);
  };

  const map = (data: Daily, valueName: DailyKeySet) => {
    return data.report.daily
      .map((value) => ({
        imp: value.imp,
        click: value.click,
        cost: value.cost,
        conv: value.conv,
        convValue: value.convValue,
        ctr: value.ctr,
        cvr: value.cvr,
        cpc: value.cpc,
        cpa: value.cpa,
        roas: value.roas
      }))
      .map((value) => {
        return Math.floor(value[valueName]);
      });
  };

  const mappingSeries = (
    data: Daily,
    firstDataSortKey: string,
    secondDataSortKey: string
  ) => {
    const firstDataSet = changeDataKeyNameToDataSetName(firstDataSortKey);
    const secondDataSet = changeDataKeyNameToDataSetName(secondDataSortKey);

    if (firstDataSet && secondDataSet) {
      const { name: firstName, value: firstValue } = firstDataSet;
      const { name: secondName, value: secondValue } = secondDataSet;
      const firstDataSeries = map(data, firstValue);
      const secondDataSeries = map(data, secondValue);
      setChartState((pre) => ({
        ...pre,
        series: [
          { name: firstName, data: firstDataSeries },
          { name: secondName, data: secondDataSeries }
        ]
      }));
    }
  };

  return { chartState, mappingCategories, mappingSeries };
};

export default useMapGraphData;
