import { atom } from "recoil";
import { Daily } from "./interface";

export const dailyAtom = atom({
  key: "dailyAtom",
  default: <Daily>{}
});

export const dateAtom = atom({
  key: "dateAtom",
  default: ""
});
