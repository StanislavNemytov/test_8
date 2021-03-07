/* eslint-disable camelcase */
import {
  GET_PAGE,
  SEND_NEW_TASK,
  START_LOADING,
  STOP_LOADING,
  UPDATE_TASK,
} from "../actions/actionsTypes";

const initialState = {
  tasks: [],
  total_task_count: 0,
  loading: true,
  currentFilter: "",
  sortDirection: {
    descend: "desc",
    ascend: "asc",
  },
  params: {
    sort_field: "",
    sort_direction: "desc",
    page: 1,
  },
  sortDirectionDefault: "desc",
};

/**
 * @param {initialState} state
 * @param {Object} action
 * @param {string} action.type
 * @param {Object} action.response
 * @param {Object} action.response.data
 * @param {number} action.response.data.total_task_count
 * @param {Object} action.response.data.message
 * @param {Object[]} action.response.data.message.tasks
 * @returns {initialState}
 */
export default function reducerAPI(state = initialState, action) {
  switch (action.type) {
    case GET_PAGE: {
      const {
        response: {
          data: {
            message: { tasks, total_task_count },
          },
        },
        params: { page, sort_field, sort_direction },
      } = action.response;
      return {
        ...state,
        tasks,
        total_task_count,
        loading: false,
        params: {
          page: page || state.params.page,
          sort_field: sort_field || state.params.sort_field,
          sort_direction: sort_direction || state.params.sort_direction,
        },
      };
    }

    case SEND_NEW_TASK: {
      const { message } = action.response.data;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          message,
        },
      };
    }

    case START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_TASK: {
      const { id, status, text } = action.response;
      const newTasks = state.tasks.map((item) => {
        const newItem = { ...item };
        if (item.id === id) {
          newItem.text = text;
          newItem.status = status;
        }
        return newItem;
      });

      return {
        ...state,
        tasks: newTasks,
        loading: false,
      };
    }

    default:
      return state;
  }
}
