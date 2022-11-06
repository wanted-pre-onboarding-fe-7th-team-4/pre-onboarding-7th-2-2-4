import { theme } from "@/lib/style";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import Svg from "../Svg";

interface Props {
  data: string[];
  className?: string;
  onChange?: (index: number, value: string) => void;
  size?: "default" | "large";
  tagColor?: string;
}

const ComboBox = ({
  data,
  className,
  onChange,
  size = "default",
  tagColor
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(data[selectedIndex]);
  const [showOption, setShowOption] = useState(false);
  const onClickItem = useCallback(
    (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      const target = e.target as HTMLLIElement;
      if (target) {
        const datasetIdx = target.dataset.index;
        if (datasetIdx !== undefined) {
          const idx = Number(datasetIdx);
          setSelectedIndex(idx);
          setValue(data[idx]);
          setShowOption(false);
          if (idx !== selectedIndex) onChange && onChange(idx, data[idx]);
        }
      }
    },
    [data, onChange, selectedIndex]
  );

  return (
    <ComboBoxContainer className={className} show={showOption} size={size}>
      <div
        className="selectedValue"
        onClick={() => {
          setShowOption((prev) => !prev);
        }}
      >
        <p>
          {tagColor && (
            <span className="tag" style={{ backgroundColor: tagColor }} />
          )}
          {value}
        </p>
        <Svg
          className="dropdownIcon"
          width={24}
          height={24}
          src="/icons/icon_down.svg"
        />
      </div>
      <ul onClick={onClickItem} className="optionContainer">
        {data.map((value, index) => (
          <li key={index} data-index={index}>
            {value}
          </li>
        ))}
      </ul>
    </ComboBoxContainer>
  );
};

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

export default ComboBox;
