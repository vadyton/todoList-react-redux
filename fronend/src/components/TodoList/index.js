import React, { useState } from 'react';
import Todo from '../Todo';

function TodoList() {
  const [task, setTask] = useState('');

  async function addTodo(event) {
    event.preventDefault();
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskName: task }),
    });
    const result = await response.json();
    dispatch(addTask(task, result._id));
    setTask('');
  }

  function onChange(e) {
    setTask(e.target.value);
  }

  return (
    <div className="mt-3 container">
      <h1>Todo list</h1>
      <form onSubmit={addTodo}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Todo title</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="textHelp"
            onChange={onChange}
            value={task}
          />
          <small id="textHelp" className="form-text text-muted">
            Enter new task
          </small>
        </div>
        <button type="submit" className="btn btn-primary mb-4">
          Add task
        </button>
      </form>
      <Todo />
    </div>
  );
}

export default TodoList;
