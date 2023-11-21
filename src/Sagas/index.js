import { all } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
import translationSaga from './sagas/translationSaga';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    translationSaga()
  ]);
}
