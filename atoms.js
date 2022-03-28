import { atom } from "recoil";

export const initState = atom({
  key: "init",
  default: false,
});

export const userState = atom({
  key: "user",
  default: null,
});
