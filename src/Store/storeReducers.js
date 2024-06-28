import { combineReducers } from "redux";
import loginReducer from "./Slices/loginSlice";
import translationReducer from "./Slices/translationSlice";
import loginAuthReducer from "./Slices/loginAuthSlice";
import moduleReducer from "./Slices/moduleSlice";
import userRoleReducer from "./Slices/userRoleSlice";
import userRoleModuleAccessReducer from "./Slices/userRoleModuleAccessSlice";
import userMasterReducer from "./Slices/userMasterSlice";
import supplierMasterReducer from "./Slices/supplierMasterSlice";
import supplierBrandListReducer from "./Slices/supplierBrandListSlice";
import clientMasterReducer from "./Slices/clientMasterSlice";
import createCategoryReducer from "./Slices/createCategorySlice";
import brandCatalogueReducer from "./Slices/brandCatalogueSlice";
import clientPaymentReducer from "./Slices/clientPaymentDetailSlice";
import cmsReducer from "./Slices/ClientAdmin/cmsSlice";
import supplierResourceSlice from "./Slices/supplierResourceSlice";
import customerListReducer from "./Slices/ClientAdmin/customerListSlice";
import faqMasterReducer from "./Slices/ClientAdmin/faqMasterSlice";
import faqCategoryReducer from "./Slices/ClientAdmin/faqCategorySlice";
import offerMasterReducer from "./Slices/ClientAdmin/offerMasterSlice";
import bannerMasterReducer from "./Slices/ClientAdmin/bannerMasterSlice";
import commissionReportReducer from "./Slices/ClientAdmin/clientCommissionReportSlice";
import addSpecialReducer from "./Slices/ClientAdmin/addSpecialListSlice";
import clientProductMappingReducer from "./Slices/clientProductMappingSlice";
import emailEventMasterReducer from "./Slices/ClientAdmin/emailEventMasterSlice";
import allocateBrandReducer from "./Slices/ClientAdmin/allocateBrandSlice";
import productReducer from "./Slices/productSlice";
import promotionalReducer from "./Slices/ClientAdmin/promotionalSlice";
import promotionalAllocateBrandReducer from "./Slices/promotionalAllocateBrandSlice";

const reducers = combineReducers({
  loginReducer: loginReducer,
  supplierResourceReducer: supplierResourceSlice,
  clientPaymentReducer: clientPaymentReducer,
  brandCatalogueReducer: brandCatalogueReducer,
  translationReducer: translationReducer,
  loginAuthReducer: loginAuthReducer,
  moduleReducer: moduleReducer,
  userRoleReducer: userRoleReducer,
  userRoleModuleAccessReducer: userRoleModuleAccessReducer,
  userMasterReducer: userMasterReducer,
  supplierMasterReducer: supplierMasterReducer,
  supplierBrandListReducer: supplierBrandListReducer,
  clientMasterReducer: clientMasterReducer,
  createCategoryReducer: createCategoryReducer,
  customerListReducer: customerListReducer,
  faqMasterReducer: faqMasterReducer,
  bannerMasterReducer: bannerMasterReducer,
  faqCategoryReducer: faqCategoryReducer,
  cmsReducer: cmsReducer,
  offerMasterReducer: offerMasterReducer,
  commissionReportReducer: commissionReportReducer,
  addSpecialReducer:addSpecialReducer,
  clientProductMappingReducer:clientProductMappingReducer,
  emailEventMasterReducer:emailEventMasterReducer,
  allocateBrandReducer:allocateBrandReducer,
  productReducer:productReducer,
  promotionalReducer:promotionalReducer,
  promotionalAllocateBrandReducer:promotionalAllocateBrandReducer,
});

export default reducers;
