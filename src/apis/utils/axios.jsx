import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACK_BASE_URL,
});
