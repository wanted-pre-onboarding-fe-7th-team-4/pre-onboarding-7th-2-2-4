import React, { useEffect } from "react";

import styled from "styled-components";
import Chart from "react-apexcharts";
import useGetDaily from "./hooks/useGetDaily";
import useMapDashBoardData from "./hooks/useMapDashBoradData";

import useControlledSelectButton from "./hooks/useControlledSelectButton";
import useMapGraphData from "./hooks/useMapGraphData";
import { DATA_KEYS } from "@/lib/constant/constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { dailyAtom } from "@/lib/state/daily";
import { dateAtom } from "@/lib/state/date";
import { Daily } from "@/lib/state/interface";
import AdInfoList from "./AdInfoList";

const DashBoardContents = () => {
  const date = useRecoilValue(dateAtom);
  const [startDate, endDate] = date;
  const [newDaily, setNewDaily] = useRecoilState(dailyAtom);
  const { daily, isLoading, isSuccess } = useGetDaily();
  const { dashBoard, mappingDailyData } = useMapDashBoardData();
  const { chartState, mappingCategories, mappingSeries } = useMapGraphData();
  const {
    firstDataSortKey,
    secondDataSortKey,
    handleChartDataSort,
    setFirstDataSortKey,
    setSecondDataSortKey
  } = useControlledSelectButton();

  useEffect(() => {
    if (daily && date && startDate && endDate) {
      const findStartDateIndex = daily.report.daily.findIndex(
        (value) => value.date === startDate
      );
      const findEndDateIndex = daily.report.daily.findIndex(
        (value) => value.date === endDate
      );

      let filterDateForBeforeThreeDays: Daily["report"]["daily"];
      if (findStartDateIndex - 3 < 0) {
        filterDateForBeforeThreeDays =
          daily.report.daily.slice(findStartDateIndex);
      } else {
        filterDateForBeforeThreeDays = daily.report.daily.slice(
          findStartDateIndex - 3,
          findStartDateIndex
        );
      }

      const filterDataSelectDate = daily.report.daily.slice(
        findStartDateIndex,
        findEndDateIndex
      );

      setNewDaily((pre) => ({
        ...pre,
        selectData: { report: { daily: filterDataSelectDate } }
      }));
      setNewDaily((pre) => ({
        selectData: pre.selectData,
        beforeThreeDay: {
          report: { daily: filterDateForBeforeThreeDays }
        }
      }));
    }
  }, [daily, date, startDate, endDate]);

  useEffect(() => {
    if (isSuccess && Object.keys(newDaily).length !== 0) {
      mappingDailyData(newDaily);
      mappingCategories(newDaily.selectData);
    }
  }, [isSuccess, newDaily]);

  useEffect(() => {
    if (isSuccess && Object.keys(newDaily).length !== 0) {
      mappingSeries(newDaily.selectData, firstDataSortKey, secondDataSortKey);
    }
  }, [newDaily, isSuccess, firstDataSortKey, secondDataSortKey]);

  return (
    <Container>
      <TitleWrapper>
        <h1>통합 광고 현황</h1>
      </TitleWrapper>

      <DashBoardContainer>
        {isLoading ? (
          <div>데이터를 가져오는 중입니다.</div>
        ) : (
          <>
            <AdInfoList dashBoardData={dashBoard} />
            <GraphContainer>
              <ChartDataSortButton
                onChange={handleChartDataSort(setFirstDataSortKey)}
                value={firstDataSortKey}
              >
                <ChartSelectorGroup>
                  {DATA_KEYS.map((value) => (
                    <DataSortOption key={value} value={value}>
                      {value}
                    </DataSortOption>
                  ))}
                </ChartSelectorGroup>
              </ChartDataSortButton>
              <ChartDataSortButton
                onChange={handleChartDataSort(setSecondDataSortKey)}
                value={secondDataSortKey}
              >
                <ChartSelectorGroup>
                  {DATA_KEYS.map((value) => (
                    <DataSortOption
                      key={value}
                      value={value}
                      disabled={value === firstDataSortKey}
                    >
                      {value}
                    </DataSortOption>
                  ))}
                </ChartSelectorGroup>
              </ChartDataSortButton>
              <Chart
                type="line"
                width="100%"
                options={chartState.options}
                series={chartState.series}
              />
            </GraphContainer>
          </>
        )}
      </DashBoardContainer>
    </Container>
  );
};

export default DashBoardContents;

const Container = styled.div`
  padding: 2.1rem 4rem 2rem;
`;
const TitleWrapper = styled.div`
  padding: 2rem 0;
  h1 {
    font-weight: 700;
    font-size: 16px;
  }
`;
const DashBoardContainer = styled.div`
  padding: 4rem;
  background-color: ${(props) => props.theme.color.bg_w};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 2rem;
`;

const GraphContainer = styled.div``;

const ChartDataSortButton = styled.select``;

const ChartSelectorGroup = styled.optgroup``;

const DataSortOption = styled.option``;
