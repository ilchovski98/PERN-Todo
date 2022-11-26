import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
  const [data, setData] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/todos`);
      const responseJson = await response.json();
      if (responseJson) {
        setData(responseJson);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE'
      });
      const responseJson = await response.json();

      if (responseJson.rowCount === 1) {
        setData(data.filter(el => el.todo_id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((el, index) => (
            <tr key={index}>
              <th>{el.description}</th>

              <th>
                <EditTodo todo={el} />
              </th>

              <th>
                <button
                  className="btn btn--danger"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTodo(el.todo_id);
                  }}
                >Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default ListTodo;
