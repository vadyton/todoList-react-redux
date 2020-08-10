import React, { useEffect } from 'react';
import Loader from '../Loader';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteTask,
  completeTask,
  load,
} from '../../Redux/action/todo-action';
import EditTask from '../EditTodo';

function Todo() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  // load todolist from db
  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  // delete task
  async function deleteTaskFunc(e) {
    const { id } = e.target;
    e.preventDefault();
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    dispatch(deleteTask(id));
  }

  // complete task
  async function checkTask(e) {
    const { id, checked } = e.target;
    await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: checked }),
    });
    dispatch(completeTask(id));
  }

  return (
    <>
      {loading && <Loader />}
      <ul className=" list-group">
        {todos.length > 0 &&
          todos.map((el) => (
            <li className="d-flex list-group-item align-items-center" key={el._id}>
              <span className="flex-grow-1">{el.taskName}</span>
              <EditTask id={el._id} text={el.taskName}/>
              <button
                id={el._id}
                onClick={deleteTaskFunc}
                type="button"
                className="btn btn-outline-danger btn-sm ml-2"
              >
                Delete
              </button>
              <div className="form-check ml-4">
                <input
                  id={el._id}
                  onChange={checkTask}
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={el.isComplete}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Done
                </label>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Todo;
