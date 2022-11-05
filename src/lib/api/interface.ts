import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface APIInterface {
  fetch: (
    url: string,
    config?: AxiosRequestConfig<any>
  ) => Promise<AxiosResponse<any, any>>;
}
