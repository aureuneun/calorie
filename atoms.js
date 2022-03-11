import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});

export const userState = atom({
  key: "user",
  default: null,
});
