import { all } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
import translationSaga from './sagas/translationSaga';
import { rolemasterSaga } from './sagas/rolemasterSaga';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    translationSaga(),
    rolemasterSaga(),
  ]);
}
