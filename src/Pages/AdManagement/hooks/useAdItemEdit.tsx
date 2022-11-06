import { adListState } from "@/lib/state/adList";
import { IAdItem } from "@/lib/state/interface";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const useAdItemEdit = (adItem: IAdItem) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editAdItem, setEditAdItem] = useState(adItem);
  const setAdList = useSetRecoilState(adListState);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
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
    setEditAdItem({
      ...editAdItem,
      [name]: checked ? "ended" : "active"
    });
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

  const renderAdItemSpan = React.useCallback(
    (
      name: string,
      value: string | number,
      isEdit: boolean,
      isStatus?: boolean
    ) => {
      value = isStatus ? (value === "active" ? "진행중" : "중단됨") : value;
      const isChecked = isStatus ? value === "active" : false;
      if (isEdit) {
        if (isStatus) {
          return (
            <input
              type="checkbox"
              name={name}
              value={value}
              checked={isChecked}
              onChange={handleCheckChange}
            />
          );
        } else {
          return (
            <input
              type="text"
              name={name}
              value={value}
              checked={value === "active"}
              onChange={handleChange}
            />
          );
        }
      } else {
        return <span>{value}</span>;
      }
    },
    [handleChange, isEdit]
  );

  return {
    isEdit,
    editAdItem,
    handleEdit,
    handleCancel,
    handleSubmit,
    renderAdItemSpan
  };
};

export default useAdItemEdit;
