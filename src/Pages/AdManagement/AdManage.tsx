import ContentHeader from "@/Components/ContentHeader";
import SelectButton from "@/Components/SelectButton";
import APIService from "@/lib/api/apiService";
import { AD_SELECT_BUTTON_ARRAY } from "@/lib/constant/constant";
import { adListState } from "@/lib/state/adList";
import { IAdItem } from "@/lib/state/interface";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AdItem from "./AdItem";
import API, { instance } from "@/lib/api/api";

const HTTPClient = new API(instance);
const apisService = new APIService(HTTPClient);

export default function AdManagement() {
  const [adList, setAdList] = useRecoilState(adListState);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await apisService.getAdList();
      setAdList(data.ads);
    };
    getData();
  }, []);

  return (
    <Container>
      <ContentHeader title="광고관리" />
      <AdBoard>
        <ButtonContainer>
          <SelectButton onChange={handleSelectStatus} value={selectedStatus}>
            {AD_SELECT_BUTTON_ARRAY.map(({ id, name, value }) => {
              return (
                <option value={value} key={id}>
                  {name}
                </option>
              );
            })}
          </SelectButton>
          <AdMakeButton>광고 만들기</AdMakeButton>
        </ButtonContainer>
        <AdList>
          {adList.map((adItem: IAdItem) => {
            if (selectedStatus === "all") {
              return <AdItem adItem={adItem} key={adItem.id} />;
            } else {
              return (
                adItem.status === selectedStatus && (
                  <AdItem adItem={adItem} key={adItem.id} />
                )
              );
            }
          })}
        </AdList>
      </AdBoard>
    </Container>
  );
}

const Container = styled.div`
  padding: 2.1rem 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdBoard = styled.div`
  width: 1039px;
  margin-top: 30px;
  padding: 40px;
  background-color: ${({ theme }) => theme.color.bg_w};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  box-sizing: border-box;
`;

const AdList = styled.ul`
  margin-top: 40px;
  width: calc(100% - 40px);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AdMakeButton = styled.button`
  width: 108px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.primary};
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.color.bg_w};
  border: none;
  border-radius: 10px;
`;
