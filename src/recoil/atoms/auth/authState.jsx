import { atom } from "recoil";

export const authState = atom({
  key: "authentication",
  default: false,
});
