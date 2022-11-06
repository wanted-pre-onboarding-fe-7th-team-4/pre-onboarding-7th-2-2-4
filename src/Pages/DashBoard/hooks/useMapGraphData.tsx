import { Daily, DailyKeySet } from "@/lib/state/interface";
import { useState } from "react";
import { ApexOptions } from "apexcharts";

interface ChartState {
  options: ApexOptions;
  series: ApexOptions["series"];
}

interface SeriesName {
  name: string;
  value: DailyKeySet;
  unit: "%" | "원" | "회" | "";
}

const initailYaxis: ApexYAxis[] = [
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
];

const useMapGraphData = () => {
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
      { name: "선택", value: "opt", unit: "" },
      { name: "ROAS", value: "roas", unit: "%" },
      { name: "광고비", value: "cost", unit: "원" },
      { name: "노출 수", value: "imp", unit: "회" },
      { name: "클릭수", value: "click", unit: "회" },
      { name: "전환 수", value: "conv", unit: "회" },
      { name: "매출", value: "convValue", unit: "원" }
    ];

    return seriesName.find((value) => value.name === name);
  };

  const map = (data: Daily, valueName: DailyKeySet) => {
    return data.report.daily
      .map((value) => ({
        opt: 0,
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
      const {
        name: firstName,
        value: firstValue,
        unit: firstUnit
      } = firstDataSet;
      const {
        name: secondName,
        value: secondValue,
        unit: secondUnit
      } = secondDataSet;
      const firstDataSeries = map(data, firstValue);
      const secondDataSeries = map(data, secondValue);
      setChartState((pre) => ({
        options: {
          ...pre.options,
          yaxis: [
            {
              ...initailYaxis[0],
              labels: {
                formatter(val) {
                  return val + firstUnit;
                }
              }
            },
            {
              ...initailYaxis[1],
              opposite: true,
              labels: {
                formatter(val) {
                  return val + secondUnit;
                }
              }
            }
          ]
        },
        series: [
          { name: firstName, data: firstDataSeries },
          { name: secondName, data: secondDataSeries }
        ]
      }));
    }
  };

  // 날짜가 변경됐을 때 mappingCategories
  // mappingSeries
  return { chartState, mappingCategories, mappingSeries };
};

export default useMapGraphData;
