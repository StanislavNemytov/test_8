/* eslint-disable no-console */
import { httpRequests } from "../../api/api";
import actions from "../actions/actions";

function creatFormData(values) {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    form.append(key, value);
  });
  return form;
}

export const getPage = (page) => async (dispatch) => {
  const response = await httpRequests.getPage(page);
  dispatch(actions.getPage(response));
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
  // const tasksOfPage = await httpRequests.getPage();
  // await dispatch(actions.endEditing());
  // dispatch(actions.getPage(tasksOfPage));
};

export const login = (values) => async (dispatch) => {
  const form = creatFormData(values);

  const response = await httpRequests.login(form);
  dispatch(actions.login(response));
  dispatch(actions.stopLoading());
};
