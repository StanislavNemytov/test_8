import { httpRequests } from "../../api/api";
import actions from "../actions/actions";

function creatFormData(values) {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    form.append(key, value);
  });
  return form;
}

export const getPage = (params) => async (dispatch) => {
  const response = await httpRequests.getPage(params);
  dispatch(actions.getPage({ response, params }));
};

export const startLoading = () => async (dispatch) => {
  dispatch(actions.startLoading());
};

export const stopLoading = () => async (dispatch) => {
  dispatch(actions.stopLoading());
};

export const sendNewTask = (values) => async (dispatch) => {
  const form = creatFormData(values);

  const response = await httpRequests.sendNewTask(form);
  dispatch(actions.sendNewTask(response));
};

export const setCurrentEditingTask = (task) => (dispatch) => {
  dispatch(actions.setCurrentEditingTask(task));
};

export const endEditing = () => (dispatch) => {
  dispatch(actions.endEditing());
};

export const updateTask = (task) => async (dispatch) => {
  const response = await httpRequests.updateTask(task);
  if (response.data.status === "ok") {
    dispatch(actions.updateTask(task));
  }
  dispatch(actions.stopLoading());
};

export const changeModalVisibility = () => async (dispatch) => {
  dispatch(actions.changeModalVisibility());
};

export const login = (values) => async (dispatch) => {
  const form = creatFormData(values);

  const response = await httpRequests.login(form);
  await dispatch(actions.login(response));
  dispatch(actions.stopLoading());
};

export const logout = () => async (dispatch) => {
  dispatch(actions.logout());
};

export const needAuthorization = () => async (dispatch) => {
  await dispatch(actions.needAuthorization());
};

export const checkTokenValidation = () => async (dispatch) => {
  dispatch(actions.checkTokenValidation());
};
