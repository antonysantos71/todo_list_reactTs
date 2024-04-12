import { ChangeEvent, useEffect, useState } from 'react';
import './App.css'
import { Card } from './components/Card'

export interface ITodoType {
  id: number;
  title: string;
  complented: boolean;
  description: string;
}

export default function App() {

  const [todoInput, setTodoInput] = useState('');
  const [descriptionTodoInput, setDescriptionTodoInput] = useState('');
  const [todos, setTodos] = useState<ITodoType[]>(() => {
    const storedTodos = localStorage.getItem('@codersList:todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@codersList:todos', JSON.stringify(todos))
  }, [todos])

  function handleAddTodo() {
    if(todoInput === '' || descriptionTodoInput === ''){
      alert("Preencha todos os campos!!")
    } else {
      setTodos((previousTodo) => [...previousTodo, {
        id: Math.random(),
        title: todoInput,
        complented: false,
        description: descriptionTodoInput
      }])

      setTodoInput('')
      setDescriptionTodoInput('')
    }
    
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function handleInputChangeDescription(e: ChangeEvent<HTMLInputElement>){
    setDescriptionTodoInput(e.target.value)
  }

  function completeTodo(id: number) {
    setTodos((previousTodo) => 
      previousTodo.map((todo) => 
        todo.id !== id ? todo : { ...todo, complented: !todo.complented }))
  }

  function deleteTodo(id: number) {
    setTodos((previousTodo) => previousTodo.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <header>
        <h1>Todo List React Typescript </h1>
      </header>
      <div className='add-todo'>
        <input 
          placeholder='nome da tarefa' 
          value={todoInput} 
          onChange={handleInputChange} 
        />
        <input 
          placeholder='descrição da tarefa' 
          value={descriptionTodoInput} 
          onChange={handleInputChangeDescription} 
        />
        <button onClick={handleAddTodo}>
          Adicionar
        </button>
      </div>

      {todos.map(todo => (
        <Card 
          key={todo.id} 
          todo={todo} 
          completeTodo={completeTodo} 
          deleteTodo={deleteTodo}
        />
      ))}

    </div>
  )
}