import { atom } from "recoil";
import { IAdItem } from "@/lib/state/interface";

export const adListState = atom<IAdItem[]>({
  key: "adList",
  default: []
});
