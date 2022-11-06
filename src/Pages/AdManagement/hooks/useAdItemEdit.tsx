import DatePicker, { registerLocale } from "react-datepicker";
import { adListState } from "@/lib/state/adList";
import { IAdItem } from "@/lib/state/interface";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { convertStringToCustomString } from "@/lib/utils/convertUTCTimeToCustomString";
import styled from "styled-components";

registerLocale("ko", ko);

const useAdItemEdit = (adItem: IAdItem) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editAdItem, setEditAdItem] = useState(adItem);
  const setAdList = useSetRecoilState(adListState);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditAdItem(adItem);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAdItem({
      ...editAdItem,
      [name]: value
    });
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setEditAdItem({
        ...editAdItem,
        [name]: "active"
      });
    } else {
      setEditAdItem({
        ...editAdItem,
        [name]: "ended"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEdit(false);
    setAdList((prev) => {
      const newList = prev.map((item) => {
        if (item.id === editAdItem.id) {
          return editAdItem;
        }
        return item;
      });
      return newList;
    });
  };

  const handleDateChange = (date: Date) => {
    setEditAdItem({
      ...editAdItem,
      startDate: date.toISOString()
    });
  };

  const renderAdItemSpan = React.useCallback(
    (name: string, value: string | number, isEdit: boolean) => {
      if (isEdit) {
        return (
          <AdItemEditInput
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
          />
        );
      } else {
        return <span>{value}</span>;
      }
    },
    [handleChange, isEdit]
  );

  const renderAdItemCheck = React.useCallback(
    (name: string, value: string, isEdit: boolean) => {
      if (isEdit) {
        return (
          <AdItemEditInput
            type="checkbox"
            name={name}
            checked={value === "active"}
            onChange={handleCheckChange}
          />
        );
      } else {
        return <span>{value === "ended" ? "중단됨" : "진행중"}</span>;
      }
    },
    [handleCheckChange, isEdit]
  );

  const renderDatePicker = React.useCallback(
    (date: string, isEdit: boolean) => {
      if (isEdit) {
        return (
          <DatePicker
            locale={"ko"}
            dateFormat="yyyy-MM-dd"
            selected={new Date(date)}
            onChange={handleDateChange}
            className="datePicker"
            customInput={<CustomDatePickerInput />}
          />
        );
      } else {
        return <span>{convertStringToCustomString(date)}</span>;
      }
    },
    [handleCheckChange, isEdit]
  );

  return {
    isEdit,
    editAdItem,
    handleEdit,
    handleCancel,
    handleSubmit,
    renderAdItemSpan,
    renderAdItemCheck,
    renderDatePicker
  };
};

export default useAdItemEdit;

const AdItemEditInput = styled.input`
  position: absolute;
  left: 120px;
  width: 100px;
  height: 20px;
  border: 1px solid ${(props) => props.theme.color.grey_100};
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.bg_w};
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.color.grey_800};
`;

const CustomDatePickerInput = styled.input`
  width: 100px;
  height: 20px;
  border: 1px solid ${(props) => props.theme.color.grey_100};
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.bg_w};
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.color.grey_800};
`;
