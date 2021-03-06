/* eslint-disable no-console */
const axios = require("axios").default;

export const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2",
  timeout: 1e3,
  params: {
    developer: "StanislavNemytov",
  },
});

const getParams = {
  sort_direction: "desc",
};

export const httpRequests = {
  getPage: (page = "1") =>
    instance
      .get("/", { params: { page, ...getParams } })
      .then((res) => {
        console.log("Success ========>", res);
        return res;
      })
      .catch((error) => {
        console.log("Error ========>", error);
        throw new Error(error.message);
      }),

  /**
   * @param {{email:string,username:string,text:string}} values
   */
  sendNewTask: (form) =>
    instance
      .post("/create", form)
      .then((res) => {
        console.log("Success ========>", res);
        return res;
      })
      .catch((error) => {
        console.log("Error ========>", error);
        throw new Error(error.message);
      }),

  updateTask: (task) => {
    const form = new FormData();

    form.append("text", task.text);
    form.append("status", task.status);
    form.append("token", JSON.parse(localStorage.getItem("token"))?.token);

    return instance
      .post(`/edit/${task.id}`, form)
      .then((res) => {
        console.log("Success ========>", res);
        return res;
      })
      .catch((error) => {
        console.log("Error ========>", error);
        throw new Error(error.message);
      });
  },

  login: (form) =>
    instance
      .post("/login", form)
      .then((res) => {
        console.log("Success ========>", res);
        return res;
      })
      .catch((error) => {
        console.log("Error ========>", error);
        throw new Error(error.message);
      }),
};
