import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmpEdit = () => {
    const {empid} = useParams();
    const [data, setData] = useState({ empid:'', name: '', email:'', phone:''});
    const navigate = useNavigate();
    

    useEffect(() => {
       
      axios.get('http://localhost:3030/employee/'+empid)
      .then((res) => setData(res.data))
      .catch((err) =>console.log(err));
    
     
    }, [empid])

    function handleSubmit(e) {
        e.preventDefault();
        axios.put('http://localhost:3030/employee/'+empid, data)
        .then(res => {
            alert('data updated successfully');
            navigate('/');

        })
    }
    
  return (
    <div> 
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <form className='container' onSubmit={handleSubmit}>

                <div className='card' style={{"textAlign":"left"}}>
                    <div className='card-title'>
                        <h2 className='text-center'>Employee Update</h2>
                        
                    </div>
                    <div className='card-body'> 
                    <div className='row'>
                        <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>ID</label>
                                <input 
                                value={data.id } 
                                 disabled
                                className='form-control'>

                                </input>

                            </div>
                            </div>

                            <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>Name</label>
                                <input required 
                                value={data.name || ''} 
                                onChange={(e) => setData({...data, name: e.target.value})} 
                                className='form-control'></input>
                                { data.name.length===0 &&<span className='text-danger'>The name is required</span>}

                            </div>
                            </div>


                        
                            <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>Email</label>
                                <input value={data.email || ''} onChange={(e) => setData({...data , email: e.target.value})} className='form-control'></input>

                            </div>
                            </div>

                            <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>Phone</label>
                                <input value={data.phone || ''} onChange={(e) => setData({...data , phone: e.target.value})} className='form-control'></input>

                            </div>
                            </div>


                            {/* <div className='col-lg-12 '>
                            <div className='form-check'>
                                
                                <input checked={active} onChange={e => activechange(e.target.checked)} type='checkbox'  className='form-check-input'></input>
                                <label className='form-check-label'>Is Active</label>

                            </div>
                            </div> */}
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <button className='btn btn-success' type='submit'>Save</button>
                                   
                                </div>
                            </div>

                        </div> 
                    </div>

                </div>
                </form>
            </div>
    </div>
    </div>

    
  )
}

export default EmpEdit;