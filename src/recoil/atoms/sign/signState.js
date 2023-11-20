import { atom } from "recoil";

export const signState = atom({
    key: "signForm",
    default: {
        name: "",
        email: "",
        password: ""
    }
})