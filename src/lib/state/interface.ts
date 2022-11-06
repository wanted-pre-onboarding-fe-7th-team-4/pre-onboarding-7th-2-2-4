export interface Daily {
  report: {
    daily: {
      imp: number;
      click: number;
      cost: number;
      conv: number;
      convValue: number;
      ctr: number;
      cvr: number;
      cpc: number;
      cpa: number;
      roas: number;
      date: string;
    }[];
  };
}

export type DailyKeySet =
  | "opt"
  | "imp"
  | "click"
  | "cost"
  | "conv"
  | "convValue"
  | "ctr"
  | "cvr"
  | "cpc"
  | "cpa"
  | "roas";

export interface IDaily {
  imp: number;
  click: number;
  cost: number;
  conv: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
  date: string;
}
export interface IAdItem {
  id: number;
  adType: "web" | "app";
  title: string;
  budget: number;
  status: "active" | "ended";
  startDate: string;
  endDate: string | null;
  report: {
    cost: number;
    convValue: number;
    roas: number;
  };
}

export interface IAdList {
  count: 4;
  ads: IAdItem[];
}
