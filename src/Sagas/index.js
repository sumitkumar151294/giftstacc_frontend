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
import clientLoginSaga from "./clientLoginSaga";
export default function* rootSaga() {
  yield all([
    loginSaga(),
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
    clientLoginSaga()
  ]);
}
