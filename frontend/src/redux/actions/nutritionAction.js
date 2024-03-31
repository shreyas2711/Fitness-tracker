import axios from 'axios';
import { NURTITION_LOAD_SUCCESS, NUTRITION_LOAD_FAIL, NUTRITION_LOAD_REQUEST } from '../constants/nutritionConstants';

export const nutritionLoadAction =()=>async(dispatch)=>{

    

    dispatch({type:NUTRITION_LOAD_REQUEST});
    
    try{
        
        const {data} = await axios.get(`/api/nutrition/show`);
        dispatch({ type: NURTITION_LOAD_SUCCESS, payload:data});
        // console.log("The data:",data);
        // dispatch(setNutrition(data.nutritions));
    }
    catch(error){
        dispatch({
            type: NUTRITION_LOAD_FAIL,
            payload: error.response ? error.response.data.error : 'Network error',
          });
    }
}


// export const setNutrition = (nutritions) => {
//     return {
//       type: SET_NUTRITION,
//       payload: nutritions,
//     };
//   };


export const calculateTotalsAction = (nutritions) => (dispatch) => {
    let totalProtein = {};
    let totalCalories = {};
  
    nutritions.forEach((nutrition) => {
      const dateKey = nutrition.date.toISOString().split('T')[0]; // Extracting YYYY-MM-DD
      totalProtein[dateKey] = (totalProtein[dateKey] || 0) + (nutrition.protienIntake || 0);
      totalCalories[dateKey] = (totalCalories[dateKey] || 0) + (nutrition.caloriesConsumed || 0);
    });
  
    dispatch({
      type: NURTITION_LOAD_SUCCESS,
      payload: { nutritions, totalProtein, totalCalories },
    });
  };