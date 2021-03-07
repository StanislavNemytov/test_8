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
  CHANGE_MODAL_VISIBILITY,
  NEED_AUTHORIZATION,
  CHECK_TOKEN_VALIDATION,
} from "./actionsTypes";

const actions = {
  getPage: (response) => ({ type: GET_PAGE, response }),
  startLoading: () => ({ type: START_LOADING }),
  stopLoading: () => ({ type: STOP_LOADING }),
  sendNewTask: (response) => ({ type: SEND_NEW_TASK, response }),

  setCurrentEditingTask: (task) => ({ type: SET_CURRENT_EDITING_TASK, task }),
  updateTask: (response) => ({ type: UPDATE_TASK, response }),
  endEditing: (task) => ({ type: END_EDITING, task }),

  changeModalVisibility: () => ({ type: CHANGE_MODAL_VISIBILITY }),
  login: (response) => ({ type: LOGIN, response }),
  logout: () => ({ type: LOGOUT }),
  needAuthorization: () => ({ type: NEED_AUTHORIZATION }),
  checkTokenValidation: () => ({ type: CHECK_TOKEN_VALIDATION }),
};

export default actions;
