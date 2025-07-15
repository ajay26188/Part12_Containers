import { useEffect, useState } from 'react'
import apiClient from '../util/apiClient'

import List from './List'
import Form from './Form'
import { useMatch } from 'react-router-dom'
import Todo from './Todo'

const TodoView = () => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    const { data } = await apiClient.get('/todos')
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await apiClient.post('/todos', todo)
    setTodos([...todos, data])
  }

  const deleteTodo = async (todo) => {
    await apiClient.delete(`/todos/${todo._id}`)
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await apiClient.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }

  const match = useMatch('/todos/:id');
  if (match && todos.length !== 0) {
    const id = match.params.id;
    const todo = todos.find(todo => todo._id === id);
    return (
      <div>
        <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
      </div>
    )
  }

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  )
}

export default TodoView
