// import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { userSignInAction } from '../redux/actions/authAction';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Login.css';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useEffect } from 'react';

export default function Login() {

    const {isAuthenticated} =   useSelector((state) => state.authtentication);
    const {token} =   useSelector((state) => state.authtentication);
    
    
    console.log("Is authenticated:",isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const [errors, setErrors] = useState({
        email: '',
        password: '',
      });


      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    
        setErrors({
          ...errors,
          [e.target.name]: '', // Clear the error when the user starts typing
        });
      };


      useEffect(() => {
        if (!token) {
          navigate('/');
          console.log('Wrong credentials');
        } else {
          navigate('/home');
          // console.log('Auth was successful!', formData);
        }
      }, [isAuthenticated, navigate]);
     
const handleFormSubmit = async(e)=>{  

    e.preventDefault();

    if(!formData.email || !formData.password){
        setErrors({
            email:formData.email?'' :'Email is required',
            password:formData.password?'' :'Password is required',
        });
        return;
    }

    try{
        
      
      await dispatch(userSignInAction(formData));
      
      
        

    }
    catch(error){
        console.error('Login error;',error);
        setErrors({
            email:'Invalid email or password',
            password:'Invalid email or password'
        });
    }
};



  return (
 
      <div className="login-container" style={{ backgroundColor: 'rgb(71, 71, 245)', minHeight: '100vh', padding: '20px' }}>


    <div className='login-class'>
    {/* <div className="login-inputs"> */}
  
    
       <form onSubmit={handleFormSubmit}>
       {/* <h1 style={{marginTop:'2rem'}}>Login page</h1> */}
       <div className="login-inputs">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          style={{height:'2rem',marginBottom:'1rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.email}</div>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          style={{height:'2rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.password}</div>
          <button className='login-button' type="submit" onClick={handleFormSubmit}>Log In</button>
          <Link to="/signup"><button className='signup-button' type="submit">Sign Up</button></Link>
          {/* <button type="submit">Log out</button> */}
          </div>
      </form>
      {/* </div> */}
    </div>
    
    </div>
    
  
  )
}
