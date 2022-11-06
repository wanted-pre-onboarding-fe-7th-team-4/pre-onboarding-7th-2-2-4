import { atom } from "recoil";

const NOW = new Date();

export const dateAtom = atom<[Date | null, Date | null]>({
  key: "dateAtom",
  default: [NOW, NOW]
});
