import Button from "@/Components/Button";
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
    <>
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
          <Button text="광고 만들기" bgColor="primary_blue" />
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
    </>
  );
}

const AdBoard = styled.div`
  width: 1039px;
  height: 1020px;
  margin: 20px auto;
  padding-top: 30px;
  background: ${(props) => props.theme.color.bg_w};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
`;

const AdList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 50px 30px 30px;
`;
