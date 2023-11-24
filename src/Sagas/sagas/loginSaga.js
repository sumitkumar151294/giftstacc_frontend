import { call, put, takeLatest } from "redux-saga/effects";
import {
  onLoginSubmit,
  onLoginSubmitError,
  onLoginSubmitSuccess,
} from "../../Store/Slices/loginSlice";
import { callLoginApi } from "../../Context/loginApi";

function* Login({ payload }) {
  try {
    const loginResponse = yield call(callLoginApi, payload);
    if (loginResponse.status === 5) {
      debugger;
      yield put(
        onLoginSubmitSuccess({
          data: loginResponse.result,
          message: loginResponse.result.message,
        })
      );
    } else {
      yield put(
        onLoginSubmitError({
          data: loginResponse.result,
          message: loginResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onLoginSubmitError({ data: {}, message, status_code: 400 }));
  }
}
export default function* loginSaga() {
  yield takeLatest(onLoginSubmit.type, Login);
}
