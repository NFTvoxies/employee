import axios from 'axios'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EmpCreate = () => {

    const [id] = useState("")
    const [name, namechange] = useState("")
    const [email, emailchange] = useState("")
    const [phone, phonechange] = useState("")
    const [active, activechange] = useState(true)
    const [validation, validationchange] = useState(false)
    const navigate = useNavigate();
    const inputData ={id, name, email, phone, active}

    function handlesubmit (e) {
        e.preventDefault();
        
        axios.post('http://localhost:3030/employee', inputData)
        .then((res) => {
            alert("data saved successfully")
            navigate('/')

        }).catch((err) => {
            console.log(err)
        });

    }

  return (
    <div> 
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <form className='container' onSubmit={handlesubmit}>

                <div className='card' style={{"textAlign":"left"}}>
                    <div className='card-title'>
                        <h2 className='text-center'>Employee Create</h2>
                        
                    </div>
                    <div className='card-body'> 
                    <div className='row'>
                        <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>ID</label>
                                <input value={id} disabled className='form-control'></input>

                            </div>
                            </div>

                            <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>Name</label>
                                <input required value={name} onMouseDown={e => validationchange(true)} onChange={e => namechange(e.target.value)} className='form-control'></input>
                               { name.length===0 && validation &&  <span className='text-danger'>The name is required</span>}

                            </div>
                            </div>


                        
                            <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>Email</label>
                                <input value={email} onChange={e => emailchange(e.target.value)} className='form-control'></input>

                            </div>
                            </div>

                            <div className='col-lg-12 '>
                            <div className='form-group'>
                                <label>Phone</label>
                                <input value={phone} onChange={e => phonechange(e.target.value)} className='form-control'></input>

                            </div>
                            </div>


                            <div className='col-lg-12 '>
                            <div className='form-check'>
                                
                                <input checked={active} onChange={e => activechange(e.target.checked)} type='checkbox'  className='form-check-input'></input>
                                <label className='form-check-label'>Is Active</label>

                            </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <button className='btn btn-success' type='submit'>Save</button>
                                    <Link to={"/"} className='btn btn-danger mx-2'>Back</Link>
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

export default EmpCreate