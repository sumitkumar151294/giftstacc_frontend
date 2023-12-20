
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import loginAuthReducer from './Slices/loginAuthSlice';
import moduleReducer from './Slices/moduleSlice';
import userRoleReducer from './Slices/userRoleSlice';
import userRoleModuleAccessReducer from './Slices/userRoleModuleAccessSlice';
import userMasterReducer from "./Slices/userMasterSlice";
import supplierMasterReducer from './Slices/supplierMasterSlice';
import supplierBrandListReducer from './Slices/supplierBrandListSlice';
import clientMasterReducer from './Slices/clientMasterSlice';
import createCategoryReducer from './Slices/createCategorySlice';

const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    loginAuthReducer:loginAuthReducer,
    moduleReducer:moduleReducer,
    userRoleReducer:userRoleReducer,
    userRoleModuleAccessReducer: userRoleModuleAccessReducer,
    userMasterReducer:userMasterReducer,
    supplierMasterReducer:supplierMasterReducer,
    supplierBrandListReducer:supplierBrandListReducer,
    clientMasterReducer:clientMasterReducer,
    createCategoryReducer:createCategoryReducer
});

export default reducers;