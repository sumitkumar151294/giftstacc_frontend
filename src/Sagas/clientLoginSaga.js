import { call, put, takeLatest } from "redux-saga/effects";
import {  onClientLoginSubmit,
    onClientLoginSubmitError,
  onClientLoginSubmitSuccess, } from "../Store/Slices/clientLoginSlice";

import { clientLoginApi } from "../Context/clientLoginApi";
function* Login({ payload }) {
    debugger
  try {
    const loginResponse = yield call(clientLoginApi, payload);
    if (loginResponse) {
        debugger
      yield put(
        onClientLoginSubmitSuccess({
          status_code:loginResponse?.httpStatusCode,
          message:loginResponse?.errorMessage,
          data:loginResponse?.response
        })
      );
    } else {
      yield put(
        onClientLoginSubmitError({
          status_code:loginResponse?.httpStatusCode,
          message:loginResponse?.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response.data.ErrorMessage || "Something went wrong";
    yield put(onClientLoginSubmitError({ data: {}, message, status_code: 400 }));
  }
}
export default function* clientLoginSaga() {
  yield takeLatest(onClientLoginSubmit.type, Login);
}
