
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import userMasterReducer from "./Slices/userMasterSlice";
const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    userMasterReducer:userMasterReducer,

});

export default reducers;