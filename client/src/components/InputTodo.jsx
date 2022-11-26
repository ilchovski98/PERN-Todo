import React, { useState } from 'react';
import '../assets/css/InputTodo.css';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async e => {
    try {
      const body = { description };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });
      console.log('response /api/todos', response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="input-todo">Todos</h1>

      <form onSubmit={onSubmitForm}>
        <div className="form-control">
          <input
            type="text"
            className="form-field"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button className="btn">Add</button>
        </div>
      </form>
    </>
  )
}

export default InputTodo;
