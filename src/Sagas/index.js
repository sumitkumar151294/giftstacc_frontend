import { all } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
import translationSaga from './sagas/translationSaga';
import loginAuthSaga from './sagas/loginAuthSaga';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    translationSaga(),
    loginAuthSaga()
  ]);
}
