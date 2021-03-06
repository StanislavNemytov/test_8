import { getToken, removeToken, setToken } from "../../helpers/token";
import { LOGIN, LOGOUT } from "../actions/actionsTypes";

function verifyToken() {
  const { status } = getToken();
  if (["empty", "outdated"].includes(status)) {
    return false;
  }

  return true;
}

const initialState = {
  expired: verifyToken(),
  status: "",
};

export default function reducerAuthorization(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case LOGIN: {
      const {
        message: { token },
        status,
      } = response.data;

      setToken(token);

      return {
        expired: true,
        status,
      };
    }

    case LOGOUT: {
      removeToken();
      return { expired: false, status: "" };
    }

    default:
      return state;
  }
}
