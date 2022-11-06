import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { dailyAtom } from "@/lib/state/daily";

const InfoCardList = () => {
  const newDaily = useRecoilValue(dailyAtom);
  console.log(newDaily);
  return <Cotainer>InfoCardList</Cotainer>;
};

export default InfoCardList;

const Cotainer = styled.div``;
