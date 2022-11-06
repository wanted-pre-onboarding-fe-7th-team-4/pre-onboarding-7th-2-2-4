import { IAdItem } from "@/lib/state/interface";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import useAdItemEdit from "./hooks/useAdItemEdit";

interface Props {
  adItem: IAdItem;
}
export default function AdItem({ adItem }: Props) {
  const { adType, title } = adItem;
  const {
    isEdit,
    editAdItem,
    handleEdit,
    handleCancel,
    handleSubmit,
    renderAdItemSpan
  } = useAdItemEdit(adItem);
  return (
    <AdItemContainer onSubmit={handleSubmit}>
      <AdName>
        {adType === "web" ? "웹광고" : "앱광고"}_{title}
      </AdName>
      <AdDataList>
        <AdDataItem>
          <p>상태</p>
          {renderAdItemSpan("status", editAdItem.status, isEdit, true)}
        </AdDataItem>
        <AdDataItem>
          <p>광고생성일</p>
          {renderAdItemSpan("startDate", editAdItem.startDate, isEdit)}
        </AdDataItem>
        <AdDataItem>
          <p>일 희망 예상</p>
          {renderAdItemSpan("budget", editAdItem.budget, isEdit)}
        </AdDataItem>
        <AdDataItem>
          <p>광고 수익률</p>
          {renderAdItemSpan("roas", editAdItem.report.roas, isEdit)}
        </AdDataItem>
        <AdDataItem>
          <p>매출</p>
          {renderAdItemSpan("convValue", editAdItem.report.convValue, isEdit)}
        </AdDataItem>
        <AdDataItem>
          <p>광고 비용</p>
          {renderAdItemSpan("cost", editAdItem.report.cost, isEdit)}
        </AdDataItem>
      </AdDataList>
      {isEdit ? (
        <>
          <EditButton type="submit">저장</EditButton>
          <EditButton onClick={handleCancel}>취소</EditButton>
        </>
      ) : (
        <>
          <Line></Line>
          <EditButton onClick={handleEdit}>수정하기</EditButton>
        </>
      )}
    </AdItemContainer>
  );
}

AdItem.propTypes = {
  adItem: PropTypes.object
};

const AdItemContainer = styled.form`
  width: 305px;
  height: 420px;
  padding: 40px 20px 0px 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.grey_100};
  background-color: ${({ theme }) => theme.color.bg_w};
  box-sizing: border-box;
`;

const AdName = styled.h3`
  margin-bottom: 40px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.color.grey_800};
`;

const AdDataList = styled.ul`
  width: 265px;
  margin: 0 auto;
`;

const AdDataItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 265px;
  height: 40px;
  border-top: 1px solid ${(props) => props.theme.color.grey_50};

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${(props) => props.theme.color.grey_300};
  }

  span {
    position: absolute;
    left: 120px;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: ${(props) => props.theme.color.grey_800};
  }
`;

const Line = styled.div`
  height: 1px;
  width: 265px;
  background-color: ${({ theme }) => theme.color.grey_50};
`;
const EditButton = styled.button`
  margin-top: 15px;
  width: 92px;
  height: 40px;
  background-color: ${({ theme }) => theme.color.bg_w};
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.color.grey_800};
  border: 1px solid ${({ theme }) => theme.color.grey_100};
  border-radius: 10px;
  cursor: pointer;
`;
