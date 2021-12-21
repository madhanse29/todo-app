
import './App.css';
import React from 'react';
import { useState } from  "react";


export default function App() {
  const [todos,setTodos]=useState([])
  const [todo,setTodo]=useState("")
  const[todoEditing,setTodoEditing] = useState(null)
  const [editingText,setEditingText] = useState("")

  function handleSubmit(i) {
    i.preventDefault()
  const newTodo={
    id:new Date().getTime(),
    text:todo,
    completed:false,
  }
  setTodos([...todos].concat(newTodo))
  setTodo("")
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo)=> todo.id !== id)
  
  setTodos(updatedTodos)
  }

  function toggleComplete(id){
const updatedTodos = [...todos].map((todo)=>{
  if(todo.id === id){
    todo.completed = !todo.completed
  }
  return todo
})
setTodos(updatedTodos )
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo; 
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
 
  return (
    <div className="App">
      <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
<input type="text" onChange={(i)=>setTodo(i.target.value)} value={todo}  />
<button type="submit">Submit</button>
</form>
     {todos.map((todo)=> <div key={todo.id} className="todo">
     <div className="todo-text">
     <input type="checkbox" 
     onChange={()=> toggleComplete(todo.id)}
     checked={todo.completed}
     />
{todoEditing === todo.id ? (<input 
       type="text"
       onChange={(e)=> setEditingText(e.target.value)}
       value={editingText}
       />) :( <div>{todo.text}</div>)}
   </div>
   <div className="todo-actions">
     {todoEditing === todo.id ? (<button onClick={()=> editTodo(todo.id)}>submit edit</button>) :
      (<button onClick={()=> setTodoEditing(todo.id)}>edit</button>)}
     
     <button onClick={()=> deleteTodo(todo.id)}>delete</button>
     </div>
       </div>)}
    </div>
  );
}
