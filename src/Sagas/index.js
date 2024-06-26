import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import translationSaga from "./translationSaga";
import loginAuthSaga from "./loginAuthSaga";
import moduleSaga from "./moduleSaga";
import userRoleSaga from "./userRoleSaga";
import supplierMasterSaga from "./supplierMasterSaga";
import userMasterSaga from "./userMasterSaga";
import clientMasterSaga from "./clientmasterSaga";
import userRoleModuleAccessSaga from "./userRoleModulesAccessSaga";
import createCategorySaga from "./createCategorySaga";
import supplierBrandListSaga from "./supplierBrandListSaga";
import BrandCatalogueSaga from "./brandCatalogueSaga";
import clientPaymentSaga from "./clientPaymentDetailSaga";
import supplierResourceSaga from "./supplierResourceSaga";
import addSpecialResourceSaga from "./ClientAdmin/addSpecialListSaga";
import allocateBrandSaga from "./ClientAdmin/allocateBrandSaga";
import bannerMasterSaga from "./ClientAdmin//bannerMasterSaga";
import cmsSaga from "./ClientAdmin/cmsSaga";
import offerMasterSaga from "./ClientAdmin/offerMasterSaga";
import FaqMasterSaga from "./ClientAdmin/faqMasterSaga";
import FaqCategorySaga from "./ClientAdmin/faqCategorySaga";
import clientMappingSaga from "./clientProductMappingSaga";
import productApiSaga from "./productSaga";
import promotionalSaga from "./ClientAdmin/promotionalSaga";
import promotionalAllocateBrandSaga from "./promotionalAllocateBrandSaga";
export default function* rootSaga() {
  yield all([
    loginSaga(),
    clientMappingSaga(),
    translationSaga(),
    loginAuthSaga(),
    moduleSaga(),
    userRoleSaga(),
    userMasterSaga(),
    supplierMasterSaga(),
    supplierBrandListSaga(),
    clientMasterSaga(),
    clientPaymentSaga(),
    userRoleModuleAccessSaga(),
    createCategorySaga(),
    BrandCatalogueSaga(),
    supplierResourceSaga(),
    addSpecialResourceSaga(),
    allocateBrandSaga(),
    FaqMasterSaga(),
    bannerMasterSaga(),
    FaqCategorySaga(),
    cmsSaga(),
    offerMasterSaga(),
    productApiSaga(),
    promotionalSaga(),
    promotionalAllocateBrandSaga()
  ]);
}
