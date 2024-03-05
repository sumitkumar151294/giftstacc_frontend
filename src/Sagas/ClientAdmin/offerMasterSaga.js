import { call, put, takeLatest } from "redux-saga/effects";


import { callOfferMasterGetApi, callOfferMasterPostApi, callOfferMasterUpdateApi } from "../../Context/ClientAdmin/offerMasterApi";
import { onGetOfferMaster, onGetOfferMasterError, onGetOfferMasterSuccess, onPostOfferMasterError, onPostOfferMasterSubmit, onPostOfferMasterSuccess, onUpdateOfferMaster, onUpdateOfferMasterError, onUpdateOfferMasterSuccess } from "../../Store/Slices/ClientAdmin/offerMasterSlice";

function* PostOfferMaster({ payload }) {
  try {
    const postOfferMasterResponse = yield call(callOfferMasterPostApi, payload);
    if (postOfferMasterResponse.httpStatusCode === "201") {
      yield put(
        onPostOfferMasterSuccess({
          postData: postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          status_code: postOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostOfferMasterError({
          postData: postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          status_code: postOfferMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onPostOfferMasterError({
        postData: {},
        message: error?.response?.data?.ErrorMessage,
        status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}

function* GetOfferMaster() {
  try {
    const getOfferMasterResponse = yield call(callOfferMasterGetApi);
    if (getOfferMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetOfferMasterSuccess({
          getData: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
          status_code: getOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetOfferMasterError({
          getData: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
          status_code: getOfferMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onGetOfferMasterError({ getData: {}, message, status_code: 400 })
    );
  }
}

function* PutOfferMaster({ payload }) {
  try {
    const updateOfferMasterResponse = yield call(
      callOfferMasterUpdateApi,
      payload
    );
    if (updateOfferMasterResponse.httpStatusCode === "200") {
      yield put(
        onUpdateOfferMasterSuccess({
          updateData: updateOfferMasterResponse.response,
          updateMessage: updateOfferMasterResponse.errorMessage,
          update_status_code: updateOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdateOfferMasterError({
          updateData: updateOfferMasterResponse.response,
          updateMessage: updateOfferMasterResponse.errorMessage,
          update_status_code: updateOfferMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    debugger;
    yield put(
      onUpdateOfferMasterError({
        updateData: {},
        updateMessage: error?.response?.data?.ErrorMessage,
        update_status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}

export default function* offerMasterSaga() {
  yield takeLatest(onPostOfferMasterSubmit.type, PostOfferMaster);
  yield takeLatest(onGetOfferMaster.type, GetOfferMaster);

  yield takeLatest(onUpdateOfferMaster.type, PutOfferMaster);
}
