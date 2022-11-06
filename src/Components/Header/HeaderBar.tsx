import Svg from "@/Components/Svg";
import styled from "styled-components";

const HeaderBar = () => {
  return (
    <Container>
      <button className="new">
        <Svg width={24} height={24} src="/icons/icon_alarm.svg" />
      </button>
      <button>
        <Svg width={24} height={24} src="/icons/icon_setting.svg" />
      </button>
      <div className="profileContainer">
        <Svg width={40} height={40} src="/icons/icon_profile_small.svg" />
        <span>원티드님</span>
      </div>
    </Container>
  );
};

export default HeaderBar;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.color.grey_800};
  gap: 30px;
  height: 80px;
  margin: 0 40px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey_50};

  button {
    position: relative;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
  }

  .new::after {
    content: "";
    display: block;
    position: absolute;
    background-color: ${({ theme }) => theme.color.secondary_02};
    width: 5px;
    height: 5px;
    right: -2px;
    top: -2px;
    border-radius: 5px;
  }

  .profileContainer {
    span {
      display: inline-block;
      margin-left: 10px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
