import { AxiosResponse } from "axios";
import { FILENAME } from "../constant/constant";
import { IAdList, Daily } from "../state/interface";
import { APIInterface } from "./interface";

interface APIServiceProps {
  getDaily: () => Promise<AxiosResponse<Daily>>;
  getAdList: () => Promise<AxiosResponse<IAdList>>;
}

class APIService implements APIServiceProps {
  private httpClient;

  constructor(httpClient: APIInterface) {
    this.httpClient = httpClient;
  }

  getDaily: () => Promise<AxiosResponse<Daily>> = async () => {
    const response = await this.httpClient.fetch(
      `/server/${FILENAME.TREND_DATA_SET}`
    );

    return response;
  };

  getAdList: () => Promise<AxiosResponse<IAdList>> = async () => {
    const response = await this.httpClient.fetch(
      `/server/${FILENAME.AD_LIST_DATA_SET}`
    );

    return response;
  };
}

export default APIService;
