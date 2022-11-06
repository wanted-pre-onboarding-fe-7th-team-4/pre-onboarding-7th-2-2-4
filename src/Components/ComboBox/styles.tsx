import { theme } from "@/lib/style";
import styled, { css } from "styled-components";

export const ComboBoxContainer = styled.div<{
  show: boolean;
  size: "default" | "large";
}>`
  user-select: none;
  color: ${({ theme }) => theme.color.grey_800};
  .selectedValue {
    border: 1px solid ${({ theme }) => theme.color.grey_100};
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({ show }) =>
      show
        ? css`
            border-bottom: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          `
        : ""}
  }

  .dropdownIcon {
    transform: ${({ show }) => (show ? "rotate(180deg)" : "rotate(0)")};
  }

  .optionContainer {
    overflow: hidden;
    opacity: ${({ show }) => (show ? "1" : "0")};
    height: ${({ show }) => (show ? "initial" : "0px")};
    border: 1px solid
      ${({ show }) => (show ? theme.color.grey_100 : "transparent")};
    border-radius: 0 0 10px 10px;
    transition: 0.3s opacity;
  }
  .tag {
    display: inline-block;
    width: 10px;
    height: 10px;
    padding: 0;
    margin-right: 10px;
    border-radius: 10px;
  }

  ${({ size }) =>
    size === "large"
      ? css`
          .selectedValue,
          .optionContainer li {
            padding: 20px;
            font-weight: 700;
            font-size: 16px;
          }
        `
      : css`
          .selectedValue,
          .optionContainer li {
            font-weight: 500;
            font-size: 14px;
            padding: 14px 20px;
          }
        `}
`;
