import { DATA_KEYS } from "@/lib/constant/constant";
import {
  firstDataSortKeyAtom,
  secondDataSortKeyAtom
} from "@/lib/state/selector";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const useControlledSelectButton = () => {
  const [firstDataSortKey, setFirstDataSortKey] =
    useRecoilState(firstDataSortKeyAtom);
  const [secondDataSortKey, setSecondDataSortKey] = useRecoilState(
    secondDataSortKeyAtom
  );

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
