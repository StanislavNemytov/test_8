import { getToken, removeToken, setToken } from "../../helpers/token";
import {
  LOGIN,
  LOGOUT,
  CHANGE_MODAL_VISIBILITY,
} from "../actions/actionsTypes";

function verifyToken() {
  const { status } = getToken();
  if (["empty", "outdated"].includes(status)) {
    return false;
  }

  return true;
}

const initialState = {
  expired: verifyToken(),
  modalIsVisible: false,
};

export default function reducerAuthorization(state = initialState, action) {
  const { type, response } = action;

  switch (type) {
    case LOGIN: {
      const {
        message: { token },
        status,
        message,
      } = response.data;

      if (status === "ok") {
        setToken(token);

        return {
          expired: true,
          modalIsVisible: !state.modalIsVisible,
        };
      }

      return {
        ...state,
        message,
      };
    }

    case LOGOUT: {
      removeToken();
      return { expired: false, status: "" };
    }

    case CHANGE_MODAL_VISIBILITY: {
      return {
        ...state,
        modalIsVisible: !state.modalIsVisible,
      };
    }

    default:
      return state;
  }
}
