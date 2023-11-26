import { axios } from "../../utils/axios.jsx";

const MEMBER_PATH = "/member";

export const memberApi = {
  emailCheck: (signForm) => axios.post(`${MEMBER_PATH}/email/check`, signForm),
  signUp: (signForm) => axios.post(`${MEMBER_PATH}/sign/up`, signForm),
  signIn: (signForm) => axios.post(`${MEMBER_PATH}/sign/in`, signForm),
};
