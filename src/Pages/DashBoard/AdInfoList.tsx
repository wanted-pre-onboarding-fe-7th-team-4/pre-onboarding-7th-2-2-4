import styled from "styled-components";
import { useEffect } from "react";
import useDashAdData from "./hooks/useDashAdData";
import useMapDashBoardData from "./hooks/useMapDashBoradData";

const AdInfoList = () => {
  const { currentList, prevList } = useDashAdData();
  const { dashBoard: dashBoardData, mappingDailyData } = useMapDashBoardData();

  useEffect(() => {
    if (currentList && prevList) {
      const data = { selectData: currentList, beforeThreeDay: prevList };
      mappingDailyData(data);
      console.log(currentList);
    }
  }, [currentList, prevList]);

  return (
    <SummaryItemContainer>
      {dashBoardData !== undefined &&
        dashBoardData.map(({ name, value, beforeThreeDayValue, isDecrese }) => (
          <SummaryItemWrapper key={name}>
            <div>
              <p className="name">{name}</p>
              <p className="value">{`${value}`}</p>
            </div>
            <div
              className={!isDecrese ? "up" : "down"}
            >{`${beforeThreeDayValue}`}</div>
          </SummaryItemWrapper>
        ))}
    </SummaryItemContainer>
  );
};

export default AdInfoList;

export const SummaryItemContainer = styled.div`
  display: grid;
  gap: 22px 20px;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 42px;
`;
export const SummaryItemWrapper = styled.div`
  background: ${(props) => props.theme.color.bg_w};
  border: 0.5px solid ${(props) => props.theme.color.grey_50};
  border-radius: 10px;
  display: flex;
  padding: 18px 40px;
  align-items: flex-end;
  justify-content: space-between;

  .name {
    font-weight: 500;
    font-size: 12px;
    color: ${(props) => props.theme.color.grey_300};
    margin-bottom: 10px;
  }

  .value {
    font-weight: 700;
    font-size: 16px;
    color: ${(props) => props.theme.color.grey_800};
  }

  .up,
  .down {
    font-weight: 500;
    font-size: 12px;
    color: ${(props) => props.theme.color.grey_300};

    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -15px;
      top: 2px;

      width: 0;
      height: 0;
    }
  }
  .up::before {
    border-bottom: 8px solid ${(props) => props.theme.color.secondary_02};

    border-top: 0px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  .down::before {
    border-bottom: 0px solid transparent;
    border-top: 8px solid ${(props) => props.theme.color.graph_02};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
`;
