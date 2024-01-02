
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import loginAuthReducer from './Slices/loginAuthSlice';
import moduleReducer from './Slices/moduleSlice';
import userRoleReducer from './Slices/userRoleSlice';
import createCategoryReducer from './Slices/createCategorySlice';
import userMasterReducer from "./Slices/userMasterSlice";
import supplierMasterReducer from './Slices/supplierMasterSlice';
import supplierBrandListReducer from './Slices/supplierBrandListSlice';
import clientMasterReducer from './Slices/clientMasterSlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    loginAuthReducer:loginAuthReducer,
    moduleReducer:moduleReducer,
    userRoleReducer:userRoleReducer,
    createCategoryReducer:createCategoryReducer,
    userMasterReducer:userMasterReducer,
    supplierMasterReducer:supplierMasterReducer,
    supplierBrandListReducer:supplierBrandListReducer,
    clientMasterReducer:clientMasterReducer,
});

export default reducers;