
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
const reducers = combineReducers({
    loginReducer:loginReducer

});

export default reducers;