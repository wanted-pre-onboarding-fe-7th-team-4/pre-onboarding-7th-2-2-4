import React, { useEffect } from "react";
import API, { instance } from "@/lib/api/api";
import APIService from "@/lib/api/apiService";

import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dailyAtom } from "@/lib/state/daily";

const HTTPClient = new API(instance);
const apisService = new APIService(HTTPClient);

const DashBoardContents = () => {
  const [daily, setDaily] = useRecoilState(dailyAtom);

  useEffect(() => {
    const response = apisService.getDaily();
    console.log(response);
    response.then(setDaily);
  }, []);
  return (
    <Container>
      <h1>통합 광고 현황</h1>

      <DashBoardContainer>
        {daily.report.daily.map((value) => value.imp)}
      </DashBoardContainer>
    </Container>
  );
};

export default DashBoardContents;

const Container = styled.div``;

const DashBoardContainer = styled.div``;
