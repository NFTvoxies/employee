import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const EmpListing = () => {

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
        axios.delete('http://localhost:3030/employee/' +id)
        .then(res => {
            alert('employee deleted successfully')
            window.location.reload();
        }).catch(err => console.log(err) );
    }

    
}
    
    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])
    
    useEffect(() =>{
        axios.get('http://localhost:3030/employee')
        .then(res => {
            setColumns(Object.keys(res.data[0]));
            setRecords(res.data); 
        })
        .catch(err => console.log(err));

    }, []);
  return (
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
                        <tr >
                        {columns.map((c, i) => (
                        <th className=" bg-dark text-white" key={i}>{c}</th>
                            ))}
                            <th className=" bg-dark text-white"> Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        { 
                        records.map((d, i) => (
                            <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.phone}</td>
                            <td >
                            <button onClick={() =>{LoadEdit(d.id)}} className='btn btn-success mx-2'>Edit</button>
                            <button onClick={() =>{Removefunction(d.id)}} className='btn btn-danger mx-2'>Remove</button>
                            <button onClick={() =>{LoadDetail(d.id)}} className='btn btn-info mx-2'>Details</button>
                            </td>
                            
                            </tr>

                        ))}
                        <tr>
                            
                        </tr>
                        
                        
                    </tbody>


                </table>

            </div>
        </div>
    </div>
  )
}

export default EmpListing