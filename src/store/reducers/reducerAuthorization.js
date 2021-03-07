import { removeToken, setToken, verifyToken } from "../../helpers/token";
import { LOGIN, LOGOUT, CHECK_STATUS } from "../actions/actionsTypes";

const initialState = {
  expired: verifyToken(),
};

export default function reducerAuthorization(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case LOGIN: {
      const {
        message: { token },
      } = response.data;

      setToken(token);

      return {
        expired: true,
      };
    }

    case LOGOUT: {
      removeToken();
      return { expired: false };
    }

    case CHECK_STATUS: {
      return { expired: verifyToken() };
    }

    default:
      return state;
  }
}
