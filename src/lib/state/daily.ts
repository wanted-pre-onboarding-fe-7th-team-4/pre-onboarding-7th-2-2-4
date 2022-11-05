import { atom } from "recoil";
import { Daily } from "./interface";

export const dailyAtom = atom({
  key: "daily",
  default: <Daily>{}
});
