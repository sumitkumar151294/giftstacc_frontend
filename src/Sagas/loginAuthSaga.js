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
    if (loginAuthResponse.status === 5) {
      yield put(
        onLoginAuthSuccess({
          data: loginAuthResponse.result,
          message: loginAuthResponse.result.message,
        })
      );
    } else {
      yield put(
        onLoginAuthError({
          data: loginAuthResponse.result,
          message: loginAuthResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onLoginAuthError({ data: {}, message, status_code: 400 }));
  }
}
export default function* loginAuthSaga() {
  yield takeLatest(onLoginAuthSubmit.type, LoginAuth);
}
