import { APIInterface } from "./interface";

interface APIServiceProps {
  getDaily: () => Promise<any>;
}

class APIService implements APIServiceProps {
  private httpClient;

  constructor(httpClient: APIInterface) {
    this.httpClient = httpClient;
  }

  getDaily = async () => {
    const response = await this.httpClient.fetch("/server/trendDataSet.json");
    return response.data;
  };
}

export default APIService;
