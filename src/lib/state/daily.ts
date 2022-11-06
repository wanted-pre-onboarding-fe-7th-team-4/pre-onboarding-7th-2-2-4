import { atom } from "recoil";
import { Daily } from "./interface";

interface pickDateDailyAtom {
  week: Daily;
  beforeThreeDay: Daily;
}

export const dailyAtom = atom({
  key: "dailyAtom",
  default: <pickDateDailyAtom>{}
});

export const dateAtom = atom({
  key: "dateAtom",
  default: ""
});
