import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { loadNutritionReducer } from './reducers/nutritionReducer';
import { authReducer } from './reducers/authReducer';
import { loadActivityReducer } from './reducers/activityReducer';

// Combine reducers
const reducer = combineReducers({
  nutritions: loadNutritionReducer,
  authtentication:authReducer,
  activities:loadActivityReducer,
  
});

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };
