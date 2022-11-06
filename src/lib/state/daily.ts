import { atom } from "recoil";
import { Daily, IDaily } from "./interface";

interface pickDateDailyAtom {
  selectData: Daily;
  beforeThreeDay: Daily;
}

export const dailyAtom = atom({
  key: "dailyAtom",
  default: <pickDateDailyAtom>{}
});

export const currentDataAtom = atom({
  key: "currentData",
  default: <IDaily[]>[]
});

export const previewDataAtom = atom({
  key: "previewData",
  default: <IDaily[]>[]
});
