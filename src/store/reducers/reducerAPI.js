/* eslint-disable camelcase */
import { GET_PAGE } from "../actions/actionsTypes";

const initialState = {
  currentPage: 1,
  tasks: [],
  total_task_count: 0,
  isFetching: false,
};

/**
 * @param {initialState} state
 * @param {Object} action
 * @param {string} action.type
 * @param {Object} action.response
 * @param {number} action.response.total_task_count
 * @param {Object} action.response.message
 * @param {Object[]} action.response.message.tasks
 * @returns {initialState}
 */
export default function reducerAPI(state = initialState, action) {
  switch (action.type) {
    case GET_PAGE: {
      const {
        message: { tasks, total_task_count },
        message,
      } = action.response.data;
      // eslint-disable-next-line no-console
      console.log("message", message);
      return {
        ...state,
        tasks,
        total_task_count,
      };
    }

    default:
      return state;
  }
}
