import React, { useEffect } from "react";

import styled from "styled-components";
import Chart from "react-apexcharts";
import useGetDaily from "./hooks/useGetDaily";
import useMapDashBoardData from "./hooks/useMapDashBoradData";

import useControlledSelectButton from "./hooks/useControlledSelectButton";
import useMapGraphData from "./hooks/useMapGraphData";
import { DATA_KEYS } from "@/lib/constant/constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { dailyAtom, dateAtom } from "@/lib/state/daily";
import { Daily } from "@/lib/state/interface";

const DashBoardContents = () => {
  const date = useRecoilValue(dateAtom);
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
    if (daily && date) {
      const findDataIndex = daily.report.daily.findIndex(
        (value) => value.date === date
      );
      let filterDateForBeforeThreeDays: Daily["report"]["daily"];
      if (findDataIndex - 3 < 0) {
        filterDateForBeforeThreeDays = daily.report.daily.slice(findDataIndex);
      } else {
        filterDateForBeforeThreeDays = daily.report.daily.slice(
          findDataIndex - 3,
          findDataIndex
        );
      }

      const filterDateForSevenDays = daily.report.daily.slice(
        findDataIndex,
        findDataIndex + 7
      );

      setNewDaily((pre) => ({
        ...pre,
        week: { report: { daily: filterDateForSevenDays } }
      }));
      setNewDaily((pre) => ({
        week: pre.week,
        beforeThreeDay: {
          report: { daily: filterDateForBeforeThreeDays }
        }
      }));
    }
  }, [daily, date]);

  useEffect(() => {
    if (isSuccess && Object.keys(newDaily).length !== 0) {
      mappingDailyData(newDaily);
      mappingCategories(newDaily.week);
    }
  }, [isSuccess, newDaily]);

  useEffect(() => {
    if (isSuccess && Object.keys(newDaily).length !== 0) {
      mappingSeries(newDaily.week, firstDataSortKey, secondDataSortKey);
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
            <ADInfoList>
              {dashBoard?.map((value) => (
                <ADInfoItem key={value.name}>
                  <h5>{value.name}</h5>
                  <div>
                    <span>{value.value}</span>
                  </div>
                  <div>
                    <span>{value.beforeThreeDayValue}</span>
                  </div>
                  <div>
                    <span>{value.isDecrese}</span>
                  </div>
                </ADInfoItem>
              ))}
            </ADInfoList>
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

const ADInfoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem;
  margin-bottom: 4.2rem;
`;
const ADInfoItem = styled.li`
  h5 {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props) => props.theme.color.grey_300};
    margin-bottom: 1rem;
  }
  padding: 1.8rem 4rem;
  border: 0.5px solid ${(props) => props.theme.color.grey_50};
  border-radius: 10px;
`;

const GraphContainer = styled.div``;

const ChartDataSortButton = styled.select``;

const ChartSelectorGroup = styled.optgroup``;

const DataSortOption = styled.option``;
