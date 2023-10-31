import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpEdit from './EmpEdit';
import EmpDetails from './EmpDetails';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';

function App() {
  return (
    <div className='App' >
    
    <ToastContainer theme='colored' position='top-center'  ></ToastContainer>
    <BrowserRouter>
    <Appheader></Appheader>
  <Routes>
    <Route path="/" element={<EmpListing/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="employee/create" element={<EmpCreate/>} />
    <Route path="/employee/edit/:empid" element={<EmpEdit/>} />
    <Route path="/employee/details/:empid" element={<EmpDetails/>} />
    
  </Routes>
  </BrowserRouter>
    </div>
  );
  
}

export default App;
