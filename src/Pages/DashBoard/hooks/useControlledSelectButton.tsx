import { DATA_KEYS } from "@/lib/constant/constant";
import React, { useEffect, useState } from "react";

const useControlledSelectButton = () => {
  const [firstDataSortKey, setFirstDataSortKey] = useState("ROAS");
  const [secondDataSortKey, setSecondDataSortKey] = useState("선택");

  const handleChartDataSort =
    (setKey: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setKey(e.currentTarget.value);
    };

  useEffect(() => {
    if (firstDataSortKey === secondDataSortKey) {
      const [first] = DATA_KEYS.filter((value) => value !== firstDataSortKey);

      setSecondDataSortKey(first);
    }
  }, [firstDataSortKey, secondDataSortKey]);

  return {
    firstDataSortKey,
    secondDataSortKey,
    handleChartDataSort,
    setFirstDataSortKey,
    setSecondDataSortKey
  };
};

export default useControlledSelectButton;
