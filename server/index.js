require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
// we can now receive json data from requests
app.use(express.json());

// Routes //

// create todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1)', [description]);
    res.json(newTodo.rowCount);
  } catch (error) {
    console.error(error.message);
  }
});

// get todos
app.get('/todos', async (req, res) => {
  try {
    const getTodo = await pool.query('SELECT * FROM todo GROUP BY todo_id');
    res.json(getTodo.rows);
  } catch (error) {
    console.error(error.messsage);
  }
});

// get todo
app.get('/todos/:id', async (req, res) => {
  try {
    const getTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [req.params.id]);
    res.json(getTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const getTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
    res.json(getTodo);
  } catch (error) {
    console.error(error.message);
  }
});

// delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}...`);
});
