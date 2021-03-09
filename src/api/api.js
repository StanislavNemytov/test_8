/* eslint-disable no-console */
const axios = require("axios").default;

export const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2",
  params: {
    developer: "StanislavNemytov",
  },
});

export const httpRequests = {
  getPage: (params) =>
    instance
      .get("/", { params })
      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      }),

  sendNewTask: (form) =>
    instance
      .post("/create", form)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      }),

  updateTask: (task) => {
    const form = new FormData();

    form.append("text", task.text);
    form.append("status", task.status);
    form.append("token", JSON.parse(localStorage.getItem("token"))?.token);

    return instance
      .post(`/edit/${task.id}`, form)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      });
  },

  login: (form) =>
    instance
      .post("/login", form)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      }),
};
