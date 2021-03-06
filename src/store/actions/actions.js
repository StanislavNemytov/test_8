import {
  GET_PAGE,
  START_LOADING,
  SEND_NEW_TASK,
  SET_CURRENT_EDITING_TASK,
  END_EDITING,
  UPDATE_TASK,
  LOGIN,
  STOP_LOADING,
  LOGOUT,
} from "./actionsTypes";

const actions = {
  getPage: (response) => ({ type: GET_PAGE, response }),
  startLoading: () => ({ type: START_LOADING }),
  stopLoading: () => ({ type: STOP_LOADING }),
  sendNewTask: (response) => ({ type: SEND_NEW_TASK, response }),

  setCurrentEditingTask: (task) => ({ type: SET_CURRENT_EDITING_TASK, task }),
  updateTask: (response) => ({ type: UPDATE_TASK, response }),
  endEditing: (task) => ({ type: END_EDITING, task }),

  login: (response) => ({ type: LOGIN, response }),
  logout: () => ({ type: LOGOUT }),
};

export default actions;
