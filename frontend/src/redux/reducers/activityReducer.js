import { ACTIVITY_CREATE_FAIL, ACTIVITY_CREATE_REQUEST, ACTIVITY_CREATE_SUCCESS, ACTIVITY_DELETE_FAIL, ACTIVITY_DELETE_SUCCESS, ACTIVITY_LOAD_FAIL, ACTIVITY_LOAD_REQUEST, ACTIVITY_LOAD_RESET, ACTIVITY_LOAD_SUCCESS, NUTRITION_CREATE_FAIL, NUTRITION_CREATE_REQUEST, NUTRITION_CREATE_SUCCESS } from "../constants/activityConstant";


const initialState = {

    loading:false,
    success:false,
    activities:[],
   


};


export const loadActivityReducer = (state = initialState,action)=>{

    switch(action.type){
        case ACTIVITY_LOAD_REQUEST:
            return {...state}
        case ACTIVITY_LOAD_SUCCESS:
            return{
                ...state,
                loading:false,
                activities:action.payload
            }
        case ACTIVITY_LOAD_FAIL:
            return{
                ...state,
                activities:[],
                loading:true,
                error:action.payload
            }
        case ACTIVITY_LOAD_RESET:
            return initialState;
        
        default:
            return state;
    }

};

const activityDeleteReducer = (state={},action)=>{

    switch(action.type){
        case ACTIVITY_LOAD_REQUEST:
            return{
                loading:true,
            }
        case ACTIVITY_DELETE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case ACTIVITY_DELETE_FAIL:
            return{
                loading:false,
                error:action.payload,
            }
        default:
            return state;
    }
};


export const activityCreateReducer = (state=initialState,action)=>{

    switch(action.type){
        case ACTIVITY_CREATE_REQUEST:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case ACTIVITY_CREATE_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                activities:[...state.activities, action.payload],
            }
        case ACTIVITY_CREATE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}
export const nutritionCreateReducer = (state=initialState,action)=>{

    switch(action.type){
        case NUTRITION_CREATE_REQUEST:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case NUTRITION_CREATE_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                activities:[...state.activities, action.payload],
            }
        case NUTRITION_CREATE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}