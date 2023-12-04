
import { combineReducers } from 'redux';
import loginReducer from './Slices/loginSlice';
import translationReducer from './Slices/translationSlice';
import supplierMasterReducer from './Slices/supplierMasterSlice';
const reducers = combineReducers({
    loginReducer:loginReducer,
    translationReducer:translationReducer,
    supplierMasterReducer:supplierMasterReducer,
});

export default reducers;