import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpEdit from './EmpEdit';
import EmpDetails from './EmpDetails';

function App() {
  return (
    <div className='App' >
    <h1 className='mt-2 pb-5'>React Js CRUD Operations</h1>
    
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<EmpListing/>} >  </Route>
    <Route path='employee/create' element={<EmpCreate/>} >  </Route>
    <Route path='/employee/edit/:empid' element={<EmpEdit/>} >  </Route>
    <Route path='/employee/details/:empid' element={<EmpDetails/>} >  </Route>
    
  </Routes>
  </BrowserRouter>
    </div>
  );
  
}

export default App;
