import axios from "axios";  
import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/authConstants";



export const userSignInAction = (user)=>async(dispatch)=>{


    dispatch({type:USER_SIGNIN_REQUEST});

    try{
        const {data} = await axios.post('/api/user/signin',user);
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
        const {data} = await axios.get('/api/user/logout');
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