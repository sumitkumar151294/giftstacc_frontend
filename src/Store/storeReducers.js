
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
import brandCatalogueReducer from './Slices/brandCatalogueSlice';
import clientPaymentReducer from './Slices/clientPaymentDetailSlice';
import cmsReducer from './Slices/cmsSlice';
import supplierResourceSlice from './Slices/supplierResourceSlice';
import faqMasterReducer from './Slices/faqMasterSlice';
import bannerMasterReducer from './Slices/bannerMasterSlice';
import faqCategoryReducer from './Slices/faqCategorySlice';
import offerMasterReducer from './Slices/offerMasterSlice';


const reducers = combineReducers({
    loginReducer:loginReducer,
    supplierResourceReducer:supplierResourceSlice,
    clientPaymentReducer:clientPaymentReducer,
    brandCatalogueReducer:brandCatalogueReducer,
    translationReducer:translationReducer,
    loginAuthReducer:loginAuthReducer,
    moduleReducer:moduleReducer,
    userRoleReducer:userRoleReducer,
    userRoleModuleAccessReducer: userRoleModuleAccessReducer,
    userMasterReducer:userMasterReducer,
    supplierMasterReducer:supplierMasterReducer,
    supplierBrandListReducer:supplierBrandListReducer,
    clientMasterReducer:clientMasterReducer,
    createCategoryReducer:createCategoryReducer,
    faqMasterReducer:faqMasterReducer,
    bannerMasterReducer:bannerMasterReducer,
    faqCategoryReducer:faqCategoryReducer,
    cmsReducer:cmsReduce,
    cmsReducer:cmsReducer,
    offerMasterReducer:offerMasterReducer
});

export default reducers;