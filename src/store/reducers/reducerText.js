import { SET_CURRENT_EDITING_TASK, END_EDITING } from "../actions/actionsTypes";

const initialState = {
  editing: false,
  id: null,
  text: "",
};

export default function reducerText(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_CURRENT_EDITING_TASK: {
      const {
        task: { id, text },
      } = action;
      return {
        ...state,
        editing: true,
        id,
        text,
      };
    }

    case END_EDITING: {
      const newState = JSON.parse(JSON.stringify(initialState));
      return newState;
    }

    default:
      return state;
  }
}
