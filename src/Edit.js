import {React,useState,useEffect} from 'react'
import './Todo.css'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Edit() {
const [id,setId]=useState('')
    const [todo,setTodo]=useState('')
    const params=useParams()

    const fetchData=async ()=>{
        const result=await axios.get('http://localhost:8001/getTodo/'+params.id)
        setTodo(result.data.Todo.text)
        setId(result.data.Todo._id)
    }
    const update=async (e)=>{
        e.preventDefault()
        const body={
            id,todo
        }
        const result=await axios.post('http://localhost:8001/updateTodo',body)
        console.log(result);
    }
   
    useEffect(()=>{
        fetchData()
    },[])

  return (
<div>
<div className='todos'>
<div className='todo' >
<div className="checkbox"></div>
<div className='text'> <Form.Control className='input'type="text" placeholder="" value={todo} 
onChange={(e)=>setTodo(e.target.value)}/></div>
<Button onClick={(e)=>update(e)}>Save</Button>

</div>
</div>
</div>
  

  )
}

export default Edit