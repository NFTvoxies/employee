import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';


const EmpDetails = () => {
    
    const {empid}= useParams();
    const [empData, setempData] = useState([])
    

    useEffect(() => {
        axios.get('http://localhost:3030/employee/'+empid)
        .then((res) => {
            setempData(res.data);
            
        }).catch((err) => {
            console.error(err);
        })

    }, [empid]);
   
  return (
    <div>
        {empData ? (
                <div>
                    <h2 className='empdet'>Employee Details</h2>
                    <ul class="list-group">
                        <li className="list-group-item ">Name: {empData.name}</li>
                        <li className="list-group-item">Email: {empData.email}</li>
                        <li className="list-group-item">Phone: {empData.phone}</li>
                    </ul>
                    <Link to="/" type='button' className='btn btn-danger my-3' > Back</Link>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
    </div>
  )
}

export default EmpDetails