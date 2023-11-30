import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import translationSaga from './translationSaga';
import loginAuthSaga from './loginAuthSaga';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    translationSaga(),
    loginAuthSaga()
  ]);
}
