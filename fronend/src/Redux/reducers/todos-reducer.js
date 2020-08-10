import {
  ADD_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  ADD_ALL,
  EDIT_TASK,
  LOADING_STARTED,
  LOADING_COMPLETE,
  LOADING_FAILED,
} from '../action/action-types';

const initialState = {
  loading: false,
  error: false,
};

export default (state = { todos: initialState }, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            taskName: action.taskName,
            isComplete: action.isComplete,
            _id: action.id,
          },
        ],
      };
    case COMPLETE_TASK:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el._id === action.id) {
            return {
              ...el,
              isComplete: !el.isComplete,
            };
          } else {
            return el;
          }
        }),
      };
    case DELETE_TASK:
      return {
        ...state,
        todos: state.todos.filter((el) => {
          return el._id !== action.id;
        }),
      };
    case ADD_ALL:
      return {
        ...state,
        todos: action.taskList,
      };

    case EDIT_TASK:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el._id === action.id) {
            return {
              ...el,
                taskName: action.taskName};
          } else {
            return el;
          }
        }),
      };

    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOADING_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case LOADING_FAILED:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
