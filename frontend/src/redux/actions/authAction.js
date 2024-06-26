import axios from "axios";  
import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_REQUEST } from "../constants/authConstants";

// const BASE_URL = "/api/user";

export const userSignInAction = (user)=>async(dispatch)=>{


    dispatch({type:USER_SIGNIN_REQUEST});

    try{
        const {data} = await axios.post('https://fitness-tracker-vag4.onrender.com/api/user/signin',user);
        // console.log("Username is:",data.user.username);

        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data,
            
        })
        
        localStorage.setItem('token', JSON.stringify(data));
        // console.log("token is!",data.token);
        // toast.success("Login Successful!");
    }
    catch(error){
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
          });
    }

}


export const userSignOutAction = ()=> async(dispatch)=>{

    // dispatch({USER_LOGOUT_REQUEST});

    try{
        const {data} = await axios.get('https://fitness-tracker-vag4.onrender.com/api/user/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        dispatch({
            type:USER_LOGOUT,
            payload:data,
        });
        
    }
    catch(error){
        dispatch({
            payload:error.response.data.error,
        });
    }
}

export const userSignUpAction = (user)=>async(dispatch)=>{

    dispatch({type:USER_SIGNUP_REQUEST});

    try{

        const data = await axios.post('https://fitness-tracker-vag4.onrender.com/api/user/signup',user);
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data,
            
        })
    }
    catch(error){
        dispatch({
            payload:error.response.data.error,
        });
    }
}