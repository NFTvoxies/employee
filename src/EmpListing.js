import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const EmpListing = () => {
    useEffect(() => {
      let id = sessionStorage.getItem('id');
      if(id === '' || id === null){
        navigate('/login');
      }
    
    }, [])
    

const navigate = useNavigate();

const LoadDetail=(id) => {
    navigate('/employee/details/' +id);

}
const LoadEdit=(empid) => {
    navigate('/employee/edit/' +empid);
    
}

function Removefunction(id) {
    const conf = window.confirm('Are you sure you want to remove ?');
    if (conf) {
        axios.delete('http://localhost:3031/user/' +id)
        .then(res => {
            toast.error('employee deleted successfully')
            window.location.reload();
        }).catch(err => console.log(err) );
    }

    
}
    
    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])
    
    useEffect(() =>{
        axios.get('http://localhost:3031/user')
        .then(res => {
            setColumns(Object.keys(res.data[0]));
            setRecords(res.data); 
        })
        .catch(err => console.log(err));

    }, []);
  return (
    <><div className='header'>
          <Link className='btn btn-primary m-1' to={'/login'}>Logout</Link>
      </div>
      <div className="container">

              <div className="card">
                  <div className="card-title">
                      <h2>Employee Listing</h2>
                  </div>

                  <div className="card-body">
                      <div className='divbtn'>
                          <Link to={"employee/create"} className='btn btn-outline-success'>Add New</Link>
                      </div>
                      <table className="table table-bordered ">
                          <thead className=" bg-dark text-white">
                              <tr>
                                  {columns.map((c, i) => (
                                      <th className=" bg-dark text-white" key={i}>{c}</th>
                                  ))}
                                 
                              </tr>
                          </thead>

                          <tbody>

                              {records.map((d, i) => (
                                  <tr key={i}>
                                      <td>{d.id}</td>
                                      <td>{d.email}</td>
                                      <td>{d.password}</td>
                                      <td>{d.fullname}</td>
                                      <td>{d.phone}</td>
                                      <td>{d.country}</td> 
                                      <td>{d.gender}</td>
                                      <td>{d.address}</td>
                                      <td>{d.role}</td>
                                      <td>{d.Action} 
                                      
                                        <button onClick={() => 
                                         { LoadEdit(d.id); } } className='btn btn-success m-2 '>Edit</button>
                                        <button onClick={() => 
                                         { Removefunction(d.id); } } className='btn btn-danger m-2'>Remove</button>
                                        <button onClick={() => 
                                         { LoadDetail(d.id); } } className='btn btn-info m-2'>Details</button>
                                         </td>
                                      
                                  </tr>

                              ))}
                          


                          </tbody>


                      </table>

                  
              </div>
              </div>
          </div></>
    
  )
}

export default EmpListing