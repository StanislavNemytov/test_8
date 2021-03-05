import { httpRequests } from "../../api/api";
import actions from "../actions/actions";

export const getPage = (page) => async (dispatch) => {
  const response = await httpRequests.getPage(page);
  dispatch(actions.getPage(response));
};

export const startFetching = () => async (dispatch) => {
  dispatch(actions.startFetching());
};

export const stopFetching = () => async (dispatch) => {
  dispatch(actions.stopFetching());
};
