import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { userSignUpAction } from '../redux/actions/authAction';

function SignUp() {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        firstname:'',
        lastname:'',
        password: '',

      });
      const [errors, setErrors] = useState({
        username:'',
        email: '',
        firstname:'',
        lastname:'',
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



      const handleFormSubmit = async(e)=>{

        e.preventDefault();
    
        if(!formData.email || !formData.password){
            setErrors({
                username:formData.username?'' :'Username is required',
                email:formData.email?'' :'Email is required',
                password:formData.password?'' :'Password is required',
                firstname:formData.firstname?'' :'Firstname is required',
                lastname:formData.lastname?'' :'Lastname is required',

        
        });
        return;
        }
        try{
            
            await dispatch(userSignUpAction(formData));
          
        //   await dispatch(userSignInAction(formData));
          
          
            
    
        }
        catch(error){
            console.error('Signup error;',error);
        
        }
   
}



  return (

    <div className="signup-container" style={{ backgroundColor: 'rgb(71, 71, 245)', minHeight: '100vh', padding: '20px' }}>


    <div className='signup-class'>
    {/* <div className="login-inputs"> */}
  
    
       <form onSubmit={handleFormSubmit}>
       {/* <h1 style={{marginTop:'2rem'}}>Login page</h1> */}
       <div className="signup-inputs">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          style={{height:'2rem',marginBottom:'1rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.username}</div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          style={{height:'2rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.email}</div>
        <input
          type="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          placeholder="Firstname"
          style={{height:'2rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.firstname}</div>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          placeholder="Lastname"
          style={{height:'2rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.lastname}</div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          style={{height:'2rem',width:'13rem'}}
        />
        <div style={{ color: 'red' }}>{errors.password}</div>
          <button className='login-button' type="submit" onClick={handleFormSubmit}>SignUp</button>
          {/* <button type="submit">Log out</button> */}
          </div>
      </form>
      {/* </div> */}
    </div>
    
    </div>
    
  )
}

export default SignUp;
