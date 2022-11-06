import {
  adListLoadingState,
  adListState,
  adListSuccessState,
  fetchAdListSelector
} from "@/lib/state/adList";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const useGetAdList = () => {
  const [adList, setAdList] = useRecoilState(adListState);
  const fetchedAdList = useRecoilValue(fetchAdListSelector);
  const [isLoading, setIsLoading] = useRecoilState(adListLoadingState);
  const [isSuccess, setIsSuccess] = useRecoilState(adListSuccessState);

  useEffect(() => {
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      setAdList(fetchedAdList?.ads);
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);
    return () => {
      setIsLoading(false);
      setIsSuccess(false);
    };
  }, []);

  return { adList, isLoading, isSuccess };
};

export default useGetAdList;
