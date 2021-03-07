export const setToken = (token) => {
  const tokenData = JSON.stringify({ token, date: new Date() });
  localStorage.setItem("token", tokenData);
};

export const checkValidToken = (tokenDateStart) => {
  const taskDate = new Date(tokenDateStart);
  const taskDateEnd = new Date(tokenDateStart).setHours(
    taskDate.getHours() + 24
  );
  const dateNow = new Date();

  return dateNow.getTime() < taskDateEnd;
};

export const getToken = () => {
  const tokenDataString = localStorage.getItem("token");
  const result = {
    status: "empty",
  };

  if (!tokenDataString) {
    return result;
  }

  const { token, date } = JSON.parse(tokenDataString);

  const valid = checkValidToken(date);

  if (valid) {
    result.status = "ok";
    result.token = token;
    return result;
  }

  result.status = "outdated";
  return result;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const verifyToken = () => {
  const { status } = getToken();
  if (["empty", "outdated"].includes(status)) {
    return false;
  }
  return true;
};
