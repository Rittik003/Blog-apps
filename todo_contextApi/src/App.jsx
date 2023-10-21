import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos,setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )//using orev for appending new todos
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)) //filter helps to make new array with does not hold perticular todo id
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))// Taking all the value ans over writing the completed part
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))//parsing string into json

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  //Adding to local storage whenever change in todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

            <div className="mb-4">
              <TodoForm/> 
            </div>

            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id}className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App
