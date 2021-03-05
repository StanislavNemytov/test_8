import { GET_PAGE } from "./actionsTypes";

const actions = {
  getPage: (response) => ({ type: GET_PAGE, response }),
};

export default actions;
