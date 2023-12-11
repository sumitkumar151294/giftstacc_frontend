import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import translationSaga from './translationSaga';
import loginAuthSaga from './loginAuthSaga';
import moduleSaga from './moduleSaga';
import userRoleSaga from './userRoleSaga';
import userMasterSaga from './sagas/userMasterSaga';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    translationSaga(),
    loginAuthSaga(),
    moduleSaga(),
    userRoleSaga(),
    userMasterSaga()
  ]);
}
