import { removeToken, setToken, verifyToken } from "../../helpers/token";
import {
  CHANGE_MODAL_VISIBILITY,
  CHECK_TOKEN_VALIDATION,
  LOGIN,
  LOGOUT,
  NEED_AUTHORIZATION,
} from "../actions/actionsTypes";

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
          ...state,
          expired: true,
          status: "",
          message: "",
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
        expired: state.expired,
        modalIsVisible: !state.modalIsVisible,
      };
    }

    case NEED_AUTHORIZATION: {
      removeToken();
      return {
        expired: false,
        status: "error",
        message: "Сессия истекла, пожалуйста, зарегистрируйтесь.",
      };
    }

    case CHECK_TOKEN_VALIDATION: {
      return { ...state, needAuthorization: !verifyToken() };
    }

    default:
      return state;
  }
}
