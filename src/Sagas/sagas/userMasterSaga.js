import { call, put, takeLatest } from "redux-saga/effects";
import { onUserSubmit, onUserSubmitSuccess, onUserSubmitError } from "../../Store/Slices/userMasterSlice";
import { callUserMasterApi } from "../../Context/userMasterApi";

function* userMaster({ payload }) {
  try {
    const userMasterResponse = yield call(callUserMasterApi, payload);
    if (userMasterResponse.status === 5) {
      yield put(
        onUserSubmitSuccess({
          data: userMasterResponse.result,
          message: userMasterResponse.result.message,
        })
      );
    } else {
      yield put(
        onUserSubmitError({
          data: userMasterResponse.result,
          message: userMasterResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUserSubmitError({ data: {}, message, status_code: 400 }));
  }
}
export default function* userMasterSaga() {
  yield takeLatest(onUserSubmit.type, userMaster);
}
