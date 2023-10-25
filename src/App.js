import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpEdit from './EmpEdit';
import EmpDetails from './EmpDetails';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='App' >
    <h1 className='mt-2 pb-5'>React Js CRUD Operations</h1>
    <ToastContainer></ToastContainer>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<EmpListing/>} >  </Route>
    <Route path='/login' element={<Login/>} >  </Route>
    <Route path='/register' element={<Register/>} >  </Route>
    <Route path='employee/create' element={<EmpCreate/>} >  </Route>
    <Route path='/employee/edit/:empid' element={<EmpEdit/>} >  </Route>
    <Route path='/employee/details/:empid' element={<EmpDetails/>} >  </Route>
    
  </Routes>
  </BrowserRouter>
    </div>
  );
  
}

export default App;
