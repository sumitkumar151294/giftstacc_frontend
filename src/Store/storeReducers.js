
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer

});

export default reducers;