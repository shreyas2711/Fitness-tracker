import { NURTITION_LOAD_SUCCESS, NUTRITION_LOAD_FAIL, NUTRITION_LOAD_REQUEST, NUTRITION_LOAD_RESET } from "../constants/nutritionConstants";




const initialState = {

    loading:false,
    success:false,
    nutritions:[]
   
};

export const loadNutritionReducer = (state = initialState, action) => {
    switch (action.type) {
      case NUTRITION_LOAD_REQUEST:
        return { ...state, loading: true };
      case NURTITION_LOAD_SUCCESS:
        return {
          ...state,
          nutritions: action.payload,
          loading:false
        };
      case NUTRITION_LOAD_FAIL:
        return {
          ...state,
          nutritions: [],
          loading:true,
          error: action.payload,
          
        };
      case NUTRITION_LOAD_RESET:
        return initialState;
      default:
        return state;
    }
  };
  