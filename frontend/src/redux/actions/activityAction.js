import axios from "axios";  
import { ACTIVITY_CREATE_FAIL, ACTIVITY_CREATE_REQUEST, ACTIVITY_CREATE_SUCCESS, ACTIVITY_DELETE_FAIL, ACTIVITY_DELETE_REQUEST, ACTIVITY_DELETE_SUCCESS, ACTIVITY_LOAD_FAIL, ACTIVITY_LOAD_REQUEST, ACTIVITY_LOAD_SUCCESS, NUTRITION_CREATE_FAIL, NUTRITION_CREATE_REQUEST, NUTRITION_CREATE_SUCCESS } from "../constants/activityConstant";



export const activityLoadAction = ()=>async(dispatch)=>{

    dispatch({type:ACTIVITY_LOAD_REQUEST});

    try{
        const {data} = await axios.get(`/api/activity/show`);
        // console.log("Activity log:",data);
        dispatch({ type: ACTIVITY_LOAD_SUCCESS, payload:data});
       
    }
    
    catch(error){
        
        dispatch({
            type:ACTIVITY_LOAD_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
        });
    }
}


export const activityDeleteAction = (activityId)=>async(dispatch)=>{
    dispatch({type:ACTIVITY_DELETE_REQUEST});

        try{
           

            const {data} = axios.delete(`/api/activity/delete/${activityId}`);

            dispatch({type:ACTIVITY_DELETE_SUCCESS,payload:data});

        }
        catch(error){
            dispatch({
                type: ACTIVITY_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
              });
        }

}


export const createActivity = (activityData)=>async(dispatch)=>{

    try{
        dispatch({type:ACTIVITY_CREATE_REQUEST})

        const {data} = await axios.post(`/api/activity/create`,activityData);

        dispatch({type:ACTIVITY_CREATE_SUCCESS,payload:data});


    }
    catch(error){
        dispatch({type:ACTIVITY_CREATE_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
        })
    }
}



export const createNutrition = (nutritionData)=>async(dispatch)=>{

    try{
        dispatch({type:NUTRITION_CREATE_REQUEST})

        const {data} = await axios.post(`/api/nutrition/create`,nutritionData);

        dispatch({type:NUTRITION_CREATE_SUCCESS,payload:data});


    }
    catch(error){
        dispatch({type:NUTRITION_CREATE_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
        })
    }
}