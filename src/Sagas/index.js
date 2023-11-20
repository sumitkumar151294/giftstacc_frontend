import { all } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
export default function* rootSaga() {
  yield all([
    loginSaga()
  ]);
}
