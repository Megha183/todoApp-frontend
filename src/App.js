import './App.css';
import Todos from './Todos';
import { Route, Routes } from 'react-router-dom';
import Edit from './Edit';


function App() {
  return (
    <div className="App">
      <h1>TO-DO Lister</h1>
      <h4>Your Tasks</h4>
      <Routes>
     <Route path='/' element={<Todos></Todos>}></Route>
     <Route path='edit/:id' element={<Edit></Edit>}></Route>

      </Routes>
    </div>
  );
}

export default App;
