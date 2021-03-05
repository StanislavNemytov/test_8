/* eslint-disable no-console */
const axios = require("axios").default;

export const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2",
  timeout: 1e3,
  params: {
    developer: "StanislavNemytov",
  },
});

export const httpRequests = {
  getPage: (page = "1") =>
    instance
      .get("/", { params: { page } })
      .then((res) => {
        console.log("Success ========>", res);
        return res;
      })
      .catch((error) => {
        console.log("Error ========>", error);
        throw new Error(error.message);
      }),
};
