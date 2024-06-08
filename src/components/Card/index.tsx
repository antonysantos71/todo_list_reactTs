import { ITodoType } from '../../App';
import './styles.css'

interface ICardProps {
  todo: ITodoType;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

export const Card = ({ todo, completeTodo, deleteTodo, editTodo }: ICardProps) => {

  function handleCompleteTodo(){
    completeTodo(todo.id)
  }

  function handleDeleteTodo(){
    deleteTodo(todo.id)
  }

  function handleEditTodo(){
    editTodo(todo.id)
  }
  
  return (
    <div className={`card ${todo.complented ? 'done' : ''} `}>
      <div className='list'>
        <h2>{todo.title.toUpperCase()}</h2>
        <p>{todo.description.toLowerCase()}</p>
      </div>
      <div className='card-buttons'>
        <button onClick={handleCompleteTodo}>{todo.complented ? 'Retomar' : 'Completar'}</button>
        <button onClick={handleDeleteTodo}>Deletar</button>
        {todo.complented ? null : <button onClick={handleEditTodo}>Editar</button>}
      </div>
    </div>
  )
}