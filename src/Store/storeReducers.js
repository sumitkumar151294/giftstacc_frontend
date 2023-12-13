
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import loginAuthReducer from './Slices/loginAuthSlice';
import moduleReducer from './Slices/moduleSlice';
import userRoleReducer from './Slices/userRoleSlice';
import userMasterReducer from "./Slices/userMasterSlice";
import supplierMasterReducer from './Slices/supplierMasterSlice';
import clientMasterReducer from './Slices/clientMasterSlice';
    
const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    loginAuthReducer:loginAuthReducer,
    moduleReducer:moduleReducer,
    userRoleReducer:userRoleReducer,
    userMasterReducer:userMasterReducer,
    supplierMasterReducer:supplierMasterReducer,
    clientMasterReducer:clientMasterReducer
});

export default reducers;