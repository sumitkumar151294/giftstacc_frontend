import { call, put, takeLatest } from "redux-saga/effects";
import { callUnlockPointsGetApi, callUnlockPointsPostApi, callUnlockPointsUpdateApi } from "../../Context/ClientAdmin/unlockPointsApi";
import { onGetUnlockPoints, onGetUnlockPointsError, onGetUnlockPointsSuccess, onUnlockPointsSubmit, onUnlockPointsSubmitError, onUnlockPointsSubmitSuccess, onUnlockPointsUpdate, onUnlockPointsUpdateError, onUnlockPointsUpdateSuccess } from "../../Store/Slices/ClientAdmin/unlockPointsSlice";

function* OnUnlockPointsSubmit({ payload }) {
  try {
    const unlockPointsResponse = yield call(callUnlockPointsPostApi, payload);
    if (unlockPointsResponse.httpStatusCode === "201") {
      yield put(
        onUnlockPointsSubmitSuccess({
          data: unlockPointsResponse.response,
          message: unlockPointsResponse.errorMessage,
          status_code: unlockPointsResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onUnlockPointsSubmitError({
          data: unlockPointsResponse.response,
          message: unlockPointsResponse.errorMessage,
          status_code: unlockPointsResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUnlockPointsSubmitError({ data: {}, message, status_code: 400 }));
  }
}
function* OnGetUnlockPoints() {
  try {
    const unlockPointsGetResponse = yield call(callUnlockPointsGetApi);
    if (unlockPointsGetResponse.httpStatusCode === "200") {
      yield put(
        onGetUnlockPointsSuccess({
          data: unlockPointsGetResponse.response,
          message: unlockPointsGetResponse.errorMessage,
          status_Code:unlockPointsGetResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetUnlockPointsError({
          data: unlockPointsGetResponse.response,
          message: unlockPointsGetResponse.errorMessage,
          status_Code:unlockPointsGetResponse.httpStatusCode
        })
      );
    }
  } catch (error) { 
    const message = error.message || "Something went wrong";
    yield put(onGetUnlockPointsError({ data: {}, message, status_code: error.response.status }));
  }
}
function* OnUnlockPointsUpdate({ payload }) {
  try {
    const updateUnlockPointsResponse = yield call(callUnlockPointsUpdateApi, payload);
    if (updateUnlockPointsResponse.httpStatusCode === "201") {
      yield put(
        onUnlockPointsUpdateSuccess({
          data: updateUnlockPointsResponse.response,
          message: updateUnlockPointsResponse.errorMessage,
          status_code:updateUnlockPointsResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onUnlockPointsUpdateError({
          data: updateUnlockPointsResponse.response,
          message: updateUnlockPointsResponse.errorMessage,
          status_code:updateUnlockPointsResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUnlockPointsUpdateError({ data: {}, message, status_code: 400 }));
  }
}
export default function* unlockPointsSaga() {
  yield takeLatest(onUnlockPointsSubmit.type, OnUnlockPointsSubmit);
  yield takeLatest(onGetUnlockPoints.type, OnGetUnlockPoints);
  yield takeLatest(onUnlockPointsUpdate.type, OnUnlockPointsUpdate);
}
