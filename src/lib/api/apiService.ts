import { AxiosResponse } from "axios";
import { Daily } from "../state/interface";
import { APIInterface } from "./interface";

interface APIServiceProps {
  getDaily: () => Promise<AxiosResponse<Daily>>;
}

class APIService implements APIServiceProps {
  private httpClient;

  constructor(httpClient: APIInterface) {
    this.httpClient = httpClient;
  }

  getDaily = async () => {
    const response = await this.httpClient.fetch("/server/trendDataSet.json");

    return response;
  };
}

export default APIService;
