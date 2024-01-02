import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import translationSaga from './translationSaga';
import loginAuthSaga from './loginAuthSaga';
import moduleSaga from './moduleSaga';
import userRoleSaga from './userRoleSaga';
import userMasterSaga from './userMasterSaga';
import createCategorySaga from './createCategorySaga';
import supplierMasterSaga from './supplierMasterSaga';
import supplierBrandListSaga from './supplierBrandListSaga';
import clientMasterSaga from './clientmasterSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    translationSaga(),
    loginAuthSaga(),
    moduleSaga(),
    userRoleSaga(),
    createCategorySaga(),
    userMasterSaga(),
    supplierMasterSaga(),
    supplierBrandListSaga(),
    clientMasterSaga()
  ]);
}
