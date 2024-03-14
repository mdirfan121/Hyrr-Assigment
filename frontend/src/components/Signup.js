import {Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';
import Validation from './validateSignup';

export default function Signup() {
    // const [agree, setAgree] = useState(false);
    // const checkboxHandler = () => {
    //   setAgree(!agree);
    // }

    const [values, setValues] = useState({
        username: '',
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
         if(errors.username === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:3000/signup', values)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err.response || err.message));
         }
     } 

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-4 px-6 rounded w-35'>
       <form action="" onSubmit={handleSubmit}>
           <div className='mb-3'>
              <label htmlFor='username'><strong>username</strong></label>
              <input type="text" name='username' placeholder='Enter Username' onChange={handleInput} className='rounded-0 form-control'/>
              {errors.username && <span className='text-danger'>{errors.username}</span>}
           </div>
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
           <button className='btn btn-success w-100'>Signup</button>
           <div className='m-3'>
                <input className='m-2' type="checkbox" id="agree"/>
                <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
            </div>
           <Link to='/' className='btn btn-default border w-100 bg-light text-decoration-none'>Already registered? Log In</Link>
       </form>
    </div>
 </div>
  )
}
