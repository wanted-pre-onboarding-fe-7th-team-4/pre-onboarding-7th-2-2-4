import useMapDashBoardData from "@/Pages/DashBoard/hooks/useMapDashBoradData";
import React, { useEffect } from "react";
import styled from "styled-components";
import useDashAdData from "../../Pages/DashBoard/hooks/useDashAdData";

const InfoCardList = () => {
  const { currentList, prevList } = useDashAdData();
  const { dashBoard, mappingDailyData } = useMapDashBoardData();

  useEffect(() => {
    if (currentList && prevList) {
      const data = { selectData: currentList, beforeThreeDay: prevList };
      mappingDailyData(data);
    }
  }, [currentList, prevList]);

  console.log(dashBoard, currentList);

  return <Cotainer>InfoCardList</Cotainer>;
};

export default InfoCardList;

const Cotainer = styled.div``;
