import API, { instance } from "@/lib/api/api";
import APIService from "@/lib/api/apiService";
import { Daily } from "@/lib/state/interface";
import { useEffect, useState } from "react";

const HTTPClient = new API(instance);
const apisService = new APIService(HTTPClient);

const useGetDaily = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [daily, setDaily] = useState<Daily>();

  const handleGetData = async () => {
    setIsLoading(true);
    setIsSuccess(null);
    try {
      const response = await apisService.getDaily();

      if (response.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setDaily(response.data);
        }, 3000);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return { daily, isLoading, isSuccess };
};

export default useGetDaily;
