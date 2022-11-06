import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { LeverBI } from "../assets/LeverBI";

const Header = () => {
  return (
    <Container>
      <SVGIconContainer>
        <SvgIconWrapper>
          <LeverBI width={124} height={30} fill="none" />
        </SvgIconWrapper>
      </SVGIconContainer>
      <Nav>
        <Group>
          <TitleWrapper>
            <Title>서비스</Title>
          </TitleWrapper>
          <SelectButton>
            <Option>매드업</Option>
          </SelectButton>
        </Group>
        <Group>
          <TitleWrapper>
            <Title>광고 센터</Title>
          </TitleWrapper>
          <LinkButton to="/">
            <LinkTitle>대시보드</LinkTitle>
          </LinkButton>

          <LinkButton to="/ad-manage">
            <LinkTitle>광고관리</LinkTitle>
          </LinkButton>
        </Group>
        <GuideLinkButton to="#">
          <GuideTitleWrapper>
            <LinkTitle>레버 이용 가이드</LinkTitle>
            <SubTitle>시작하기전에 알아보기</SubTitle>
          </GuideTitleWrapper>
        </GuideLinkButton>
        <SubInfoLinkGroup>
          <SubTitle>레버는 함께 만들어갑니다.</SubTitle>
          <SubInfoLink to="#">이용약관</SubInfoLink>
        </SubInfoLinkGroup>
      </Nav>
    </Container>
  );
};

export default Header;

const RoundSquerMixin = css`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  padding: 2.2rem 2.6rem 1.9rem 2rem;
  border: 1px solid ${(props) => props.theme.color.grey_100};
  border-radius: 1rem;
`;

const Container = styled.header`
  background-color: ${(props) => props.theme.color.bg_w};
`;

const SVGIconContainer = styled.div`
  padding: 0 4rem;
`;

const SvgIconWrapper = styled.div`
  padding: 6rem 0;
  border-bottom: 1px solid ${(props) => props.theme.color.grey_50};
`;

const Nav = styled.nav`
  padding: 0 4rem;
`;

const Group = styled.div`
  padding: 5.3rem 0;
`;

const TitleWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 2rem 1.3rem;
`;
const Title = styled.h3`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.grey_300};
`;
const SelectButton = styled.select`
  ${RoundSquerMixin};
  font-size: 1.6rem;
  font-weight: 700;
`;
const Option = styled.option``;

const LinkButton = styled(Link)`
  display: inline-block;
  ${RoundSquerMixin};
  border: 0;
  text-decoration: none;
`;

const GuideLinkButton = styled(Link)`
  display: inline-block;
  ${RoundSquerMixin};
  margin-top: 22rem;
  margin-bottom: 4rem;
  padding: 3rem 2rem;
  text-decoration: none;
  background-color: ${(props) => props.theme.color.secondary_01};
  border: 0;
`;

const GuideTitleWrapper = styled.div``;

const LinkTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.grey_800};
`;

const SubTitle = styled.p`
  margin-top: 0.7rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.grey_300};
`;

const SubInfoLinkGroup = styled.div`
  padding: 0 2rem;
`;

const SubInfoLink = styled(Link)`
  display: inline-block;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.grey_300};
  margin-top: 1rem;
`;
