import { axios } from "../../utils/axios.jsx";

const BOARD_PATH = "/board";

export const boardApi = {
  list: () => axios.get(`${BOARD_PATH}/list`),
  write: (boardForm) => axios.post(`${BOARD_PATH}/write`, boardForm),
  detail: (id) => axios.get(`${BOARD_PATH}/detail/${id}`),
  update: (boardForm) => axios.put(`${BOARD_PATH}/update`, boardForm),
  drop: (id) => axios.delete(`${BOARD_PATH}/delete/${id}`),
};
