import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Validation from './ValidateLogin';
import axios from 'axios';

export default function Login() {
  const [values, setValues] = useState({
     email: '',
     password: ''
  })

  const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
  }

  const [errors,setErrors] = useState({})

  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values));
      if(errors.email === "" && errors.password === ""){
        axios.post('http://localhost:3000/login', values)
        .then(res => {
            if(res.data === "Success"){
                navigate('/home');
            }else{
                alert("wrong email or password");
            }
        })
        .catch(err => console.log(err.response || err.message));
       }
  }  

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
       <div className='bg-white p-4 px-6 rounded w-35'>
          <form action="" onSubmit={handleSubmit}>
              <div className='mb-3'>
                 <label htmlFor='email'><strong>Email</strong></label>
                 <input type="email" name='email' placeholder='Enter Email' onChange={handleInput} className='rounded-0 form-control'/>
                 {errors.email && <span className='text-danger'>{errors.email}</span>}
              </div>
              <div className='mb-3'>
                 <label htmlFor='password'><strong>Password</strong></label>
                 <input type="password" name='password' placeholder='Enter Password' onChange={handleInput} className='rounded-0 form-control'/>
                 {errors.password && <span className='text-danger'>{errors.password}</span>}
              </div>
              <button type='submit' className='btn btn-success w-100 mt-2'>Log in</button>
              <Link to='/signup' className='btn btn-default border mt-4 w-100 bg-light p-2 text-decoration-none'>New User?Create Account</Link>
          </form>
       </div>
    </div>
  )
}
