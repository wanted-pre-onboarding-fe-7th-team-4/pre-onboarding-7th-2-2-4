import { useCallback, useState } from "react";
import Svg from "../Svg";
import { ComboBoxContainer } from "./styles";

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
export default ComboBox;
