import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ id: '', email: '', 
  password: '', fullname: '', phone: '', country: '',gender: '', address: ''});

  const handleSubmit= (e) =>{
    e.preventDefault();
    

    axios.post('http://localhost:3031/user', formData)
        .then((res) => {
            alert("data saved successfully")
            navigate('/')

        }).catch((err) => {
            console.log(err)
        });

  };
  return (
    <div>
      <div className='offset-lg-3 col-lg-6'>
        <form className='container' onSubmit={handleSubmit}>
          <div className='card'>

            <div className='card-header'>
            <h1>User Registration</h1>
            </div>

            <div className='card-body'>
              <div className='row'>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>User Name <span className='errmsg'>*</span></label>
                    <input 
                    type='text' 
                    className='form-control'
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    >

                    </input> 
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Password <span className='errmsg'>*</span></label>
                    <input 
                    type='password' 
                    className='form-control'
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}>

                    </input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Full Name <span className='errmsg'>*</span></label>
                    <input 
                    type='text' 
                    className='form-control'
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}>
                      
                    </input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Email <span className='errmsg'>*</span></label>
                    <input type='email' className='form-control'
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    ></input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Phone <span className='errmsg'>*</span></label>
                    <input type='text' className='form-control'
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    ></input>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Country <span className='errmsg'>*</span></label>
                    <select className='form-control'
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    >
                      <option value="morocco">Morocco</option>
                      <option value="usa">Usa</option>
                      <option value="egypt">Egypt</option>
                      <option value="paletine">Paletine</option>
                      <option value="canada">Canada</option>
                    </select>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>Addresse </label>
                    <textarea className='form-control'
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Gender</label>
                    <br></br>
                    <input type='radio' name='gender' value="male" 
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    ></input>
                    <label>Male</label>
                    <input type='radio' name='gender' value="female" 
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    ></input>
                    <label>Female</label>

                  </div>
                </div>

              </div>

            </div>

            <div className='card-footer'>
              <button type='submit' className='btn btn-primary'> Register </button>
              <a className='btn btn-danger'>Back</a>

             

            </div>

          </div>

        </form>
      </div>
      
    </div>
  )
}

export default Register