
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import loginAuthReducer from './Slices/loginAuthSlice';
import moduleReducer from './Slices/moduleSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    loginAuthReducer:loginAuthReducer,
    moduleReducer:moduleReducer,
});

export default reducers;