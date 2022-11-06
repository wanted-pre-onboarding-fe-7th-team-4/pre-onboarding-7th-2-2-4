import { atom } from "recoil";
import { Daily } from "./interface";

interface pickDateDailyAtom {
  selectData: Daily;
  beforeThreeDay: Daily;
}

export const dailyAtom = atom({
  key: "dailyAtom",
  default: <pickDateDailyAtom>{}
});
