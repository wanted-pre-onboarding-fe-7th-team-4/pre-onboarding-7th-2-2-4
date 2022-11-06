import { atom, selector } from "recoil";
import API, { instance } from "../api/api";
import APIService from "../api/apiService";
import { IAdItem, IAdList } from "./interface";

const HTTPClient = new API(instance);
const apisService = new APIService(HTTPClient);

export const adListState = atom<IAdItem[]>({
  key: "adList",
  default: []
});

export const adListLoadingState = atom<boolean>({
  key: "adListLoading",
  default: false
});

export const adListSuccessState = atom<boolean>({
  key: "adListSuccess",
  default: false
});

export const fetchAdListSelector = selector<IAdList>({
  key: "fetchAdList",
  get: async () => {
    const response = await apisService.getAdList();
    return response.data;
  },
  set: ({ set }, newValue) => {
    set(fetchAdListSelector, newValue);
  }
});
