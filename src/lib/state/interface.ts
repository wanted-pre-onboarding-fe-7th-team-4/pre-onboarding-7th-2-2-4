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
