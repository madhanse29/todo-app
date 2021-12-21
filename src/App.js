
import './App.css';
import React from 'react';
//import use state  
import { useState } from  "react";
// install mui via npm i mui then imports icons and themes from mui
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

//main export function
export default function App() {
  const [mode,SetMode] = useState("dark")
  const [todos,setTodos]=useState([])
  const [todo,setTodo]=useState("")
  const[todoEditing,setTodoEditing] = useState(null)
  const [editingText,setEditingText] = useState("")
  const theme = createTheme({
    palette: {
      mode: mode
    },
  });

  // this function for submit new data in todo lidt
  function handleSubmit(i) {
    i.preventDefault()
    // date save in from os json object
  const newTodo={
    id:new Date().getTime(),
    text:todo,
    completed:false,
  }
  setTodos([...todos].concat(newTodo))
  setTodo("")
  }
// this function for delete todolist after complete
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo)=> todo.id !== id)
  
  setTodos(updatedTodos)
  }
//this for completed todo by check box is change to true the not tick change to false
  function toggleComplete(id){
const updatedTodos = [...todos].map((todo)=>{
  if(todo.id === id){
    todo.completed = !todo.completed
  }
  return todo
})
setTodos(updatedTodos )
  }
// this is for submit the data edited ones
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
    <ThemeProvider theme ={theme}>
      <Paper elevation={4} style 
   = {{minHeight:"100vh"}}>
    <div className="App">
      <h1>Todo List</h1>
      {/* using conditional rendering to theme changing */}
      <Button style={{marginLeft : "auto "}}
           onClick={()=> SetMode(mode === "light" ? "dark" : "light")}variant="text" color="inherit">
            {mode === "light" ? "dark" : "light"} MODE</Button>
    <form onSubmit={handleSubmit}>
<input type="text" onChange={(i)=>setTodo(i.target.value)} value={todo}  />
<Button type="submit" variant="outlined" color="success" startIcon={<AddIcon />} >Submit</Button>
</form>
{/* using map method for listing */}
     {todos.map((todo)=> <div key={todo.id} className="todo">
     <div className="todo-text">
     <input type="checkbox" 
     onChange={()=> toggleComplete(todo.id)}
     checked={todo.completed}
     />
     {/* conditional rendering for edit input  */}
{todoEditing === todo.id ? (<input 
       type="text"
       onChange={(e)=> setEditingText(e.target.value)}
       value={editingText}
       />) :( <div>{todo.text}</div>)}
   </div>
   <div className="todo-actions">
     {/* condiotinal rendering for edit and submit button */}
     {todoEditing === todo.id ? ( <Button onClick={()=> editTodo(todo.id)} 
      variant="outlined" color="success" startIcon={<ControlPointIcon />} >
       Submit</Button>
      ) :
      (
      <IconButton onClick={()=> setTodoEditing(todo.id)}aria-label="edit" color="secondary">
  <EditIcon />
  </IconButton>)}
     <IconButton onClick={()=> deleteTodo(todo.id)} aria-label="delete" color="error">
  <DeleteIcon />
  </IconButton>
     </div>
       </div>)}
    </div>
    </Paper>
   </ThemeProvider>
  );
}
