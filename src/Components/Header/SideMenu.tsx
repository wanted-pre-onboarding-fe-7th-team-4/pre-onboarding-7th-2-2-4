import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { LeverBI } from "../assets/LeverBI";
import ComboBox from "../ComboBox";
import Svg from "../Svg";

const SideMenu = () => {
  return (
    <Container>
      <SVGIconContainer>
        <LeverBI width={124} height={30} fill="none" />
      </SVGIconContainer>
      <Group>
        <Title>서비스</Title>
        <ComboBox data={["매드업", "서비스 추가하기"]} size="large" />
      </Group>
      <Group className="adContainer">
        <Title>광고 센터</Title>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <>
              <Svg
                width={24}
                height={24}
                src={`/icons/icon_dashboard_${isActive ? "on" : "off"}.svg`}
              />
              <span>대시보드</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/ad-manage"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <>
              <Svg
                width={24}
                height={24}
                src={`/icons/icon_ad_${isActive ? "on" : "off"}.svg`}
              />
              <span>광고관리</span>
            </>
          )}
        </NavLink>
      </Group>
      <GuideLinkButton to="#">
        <Svg width={40} height={40} src="/icons/icon_guide.svg" />
        <GuideTitleWrapper>
          <LinkTitle>레버 이용 가이드</LinkTitle>
          <SubTitle>시작하기전에 알아보기</SubTitle>
        </GuideTitleWrapper>
      </GuideLinkButton>
      <SubInfoLinkGroup>
        <SubTitle>레버는 함께 만들어갑니다.</SubTitle>
        <SubInfoLink to="#">이용약관</SubInfoLink>
      </SubInfoLinkGroup>
    </Container>
  );
};

export default SideMenu;

const Container = styled.nav`
  background-color: ${(props) => props.theme.color.bg_w};
  padding: 0 40px 40px 40px;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.04);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SVGIconContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.grey_50};
  padding: 60px 0;
`;

const Group = styled.div`
  margin-top: 40px;
  &.adContainer {
    flex: 1;
    a {
      text-decoration: none;
      color: inherit;
      display: block;
      padding: 20px 22px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      svg {
        margin-right: 10px;
      }
    }
    & .active {
      background-color: ${(props) => props.theme.color.grey_50};
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

const Title = styled.h3`
  padding: 13px 20px;
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => props.theme.color.grey_300};
`;

const GuideLinkButton = styled(Link)`
  display: inline-block;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.secondary_01};
  text-decoration: none;
  padding: 30px 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`;

const GuideTitleWrapper = styled.div``;

const LinkTitle = styled.h4`
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.color.grey_800};
`;

const SubTitle = styled.p`
  font-size: 12px;
  line-height: 12px;
  vertical-align: baseline;
  color: ${(props) => props.theme.color.grey_300};
`;

const SubInfoLinkGroup = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  font-size: 12px;
  color: ${(props) => props.theme.color.grey_300};
  p {
    margin-bottom: 10px;
  }
`;

const SubInfoLink = styled(Link)`
  display: inline-block;
  font-size: 1.2rem;
  color: inherit;
  margin-top: 1rem;
`;
