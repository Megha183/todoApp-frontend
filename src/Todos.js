import axios from 'axios'
import { React, useState, useEffect } from 'react'
import './Todo.css'



function Todos() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await axios.get('http://localhost:8001/getallTodo')
    setTodos(result.data.todo)
  }

  const completeTodo = async id => {
    const { data } = await axios.get('http://localhost:8001/toggleTodo/' + id)
    setTodos((todos) => todos.map((todo) => {
      if (todo._id === id) {
        return { ...todo, complete: data.complete }
      }
      fetchData()
      return todo;
    }));
  }
  
  
  const deleteTodo = async (id) => {
    const result = await axios.delete('http://localhost:8001/deleteTodo/' + id);
    setTodos((todos) => todos.filter((todo) => todo._id !== id));
  };
  

  const addTodo = async () => {
    const data = await axios.post('http://localhost:8001/addTodo', {
      text: newTodo
    });
    setTodos([...todos, data.data.todo])
    setPopupActive(false)
    setNewTodo("")
  };
   

  return (
    <div className='todos'>
      {todos.map(item => (
        <div className={`todo ${item.complete && 'is-complete'}`} key={item._id}
          onClick={() => completeTodo(item._id)}>
          <div className="checkbox"></div>
          <div className='text'>{item.text}</div>
         { /* <Link to={'edit/'+item._id}>
          <div className='edit-todo' ><i class="fa-solid fa-user-pen" ></i></div>
      </Link>*/}
          <div className='delete-todo' onClick={() => deleteTodo(item._id)}>x</div>

         </div>))}
      <div className='addPopup' onClick={() => setPopupActive(true)}>+
      </div>

      {
        popupActive ? (
          <div className='popup'>
            <div className='closePopup' onClick={() => setPopupActive
              (false)}>x</div>
            <div className='content'>
              <h3>Add Task</h3>
              <input type="text" className='add-todo-input'
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo} />
              <div className='button' onClick={addTodo}>Create Task</div>
            </div>
          </div>
        ) : " "
      }

    </div>
  )
}

export default Todos