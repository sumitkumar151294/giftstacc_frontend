import { call, put, takeLatest } from "redux-saga/effects";
import {
  onLoginAuthSubmit,
  onLoginAuthSuccess,
  onLoginAuthError,
} from "../Store/Slices/loginAuthSlice";
import { loginAuthApi } from "../Context/loginAuthApi";

function* LoginAuth({ payload }) {
  try {
    
    const loginAuthResponse = yield call(loginAuthApi, payload);
    if (loginAuthResponse.httpStatusCode === 200) {
      yield put(
        onLoginAuthSuccess({
          data: loginAuthResponse.response,
          message: loginAuthResponse.response,
        })
      );
    } else {
      yield put(
        onLoginAuthError({
          data: loginAuthResponse.response,
          message: loginAuthResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onLoginAuthError({ data: {}, message, httpStatusCode: 400 }));
  }
}
export default function* loginAuthSaga() {
  yield takeLatest(onLoginAuthSubmit.type, LoginAuth);
}
