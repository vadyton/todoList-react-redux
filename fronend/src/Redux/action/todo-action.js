import {
  ADD_TASK,
  COMPLETE_TASK,
  DELETE_TASK,
  ADD_ALL,
  EDIT_TASK,
  LOADING_STARTED,
  LOADING_COMPLETE,
  LOADING_FAILED,
} from './action-types';

// action creators
export function addTask(taskName, id) {
  return {
    type: ADD_TASK,
    taskName,
    isComplete: false,
    id,
  };
}

export function completeTask(id) {
  return {
    type: COMPLETE_TASK,
    id,
  };
}

export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id,
  };
}

export function createAll(taskList) {
  return {
    type: ADD_ALL,
    taskList,
  };
}

export function loadingStarted() {
  return {
    type: LOADING_STARTED
  }
}

export function loadingComplete(todoList) { 
  return {
    type: LOADING_COMPLETE,
    payload: todoList
  }
}

export function loadingFaild(err) {
  return {
    type: LOADING_FAILED,
    payload: err,
    error: true
  }
}

export function editTask(id, taskName) {
  return {
    type: EDIT_TASK,
    id,
    taskName,
  };
}

// thunk middleware
export function load() {
  return async (dispatch) => {
    dispatch(loadingStarted());
    try {
      const response = await fetch('/api/todos');
      const json = await response.json();
      dispatch(createAll(json));
      dispatch(loadingComplete(json));
    } catch (err) {
      dispatch(loadingFaild(err));
    }
  }
}

// thunk middleware
export function edit(id, task) {
  return async (dispatch) => {
        const response = await fetch('/api/todos', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, taskName: task }),
        });
        await response.json();
        dispatch(editTask(id, task));
  }
}
