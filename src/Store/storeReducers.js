
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import rolemasterReducer from './Slices/rolemasterSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    formData: rolemasterReducer,

});

export default reducers;