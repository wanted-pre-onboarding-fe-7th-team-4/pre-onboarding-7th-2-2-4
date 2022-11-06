import API, { instance } from "@/lib/api/api";
import APIService from "@/lib/api/apiService";
import { IAdList } from "@/lib/state/interface";
import { useEffect, useState } from "react";

const HTTPClient = new API(instance);
const apisService = new APIService(HTTPClient);

const useGetAdList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [adList, setAdList] = useState<IAdList>();

  const handleGetData = async () => {
    setIsLoading(true);
    setIsSuccess(null);
    try {
      const response = await apisService.getAdList();

      if (response.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setAdList(response.data);
        }, 3000);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return { adList, isLoading, isSuccess };
};

export default useGetAdList;
