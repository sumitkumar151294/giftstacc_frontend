import { call, put, takeLatest } from "redux-saga/effects";
import {
  bannerMasterGetApi,
  bannerMasterPostApi,
  bannerMasterUpdateApi,
} from "../Context/bannerMasterApi";
import {
  onbannerMasterSubmitError,
  onbannerMasterSubmitSuccess,
  onbannerMasterSubmit,
  onGetbannerMasterError,
  onGetbannerMaster,
  onGetbannerMasterSuccess,
  onUpdateBannerMaster,
  onUpdateBannerMasterSuccess,
  onUpdateBannerMasterError,
} from "../Store/Slices/bannerMasterSlice";

function* BannerMaster() {
  try {
    const BannerMasterResponse = yield call(bannerMasterGetApi);
    if (BannerMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetbannerMasterSuccess({
          data: BannerMasterResponse.response,
          message: BannerMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetbannerMasterError({
          data: BannerMasterResponse.response,
          message: BannerMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetbannerMasterError({ data: {}, message, status_code: 400 }));
  }
}
function* postBannerMaster({ payload }) {
  try {
    const postBannerMasterResponse = yield call(bannerMasterPostApi, payload);
    if (postBannerMasterResponse.httpStatusCode === "201") {
      yield put(
        onbannerMasterSubmitSuccess({
          postData: postBannerMasterResponse.response,
          message: postBannerMasterResponse.errorMessage,
          status_code: postBannerMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onbannerMasterSubmitError({
          data: postBannerMasterResponse.response,
          message: postBannerMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onbannerMasterSubmitError({
        data: {},
        message: error?.response?.data?.ErrorMessage,
        status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}
function* updateBannerMaster({ payload }) {
  try {
    const updateBannerMasterResponse = yield call(
      bannerMasterUpdateApi,
      payload
    );
    if (updateBannerMasterResponse.httpStatusCode === "201") {
      yield put(
        onUpdateBannerMasterSuccess({
          data: updateBannerMasterResponse.Response,
          message: updateBannerMasterResponse.errorMessage,
          status_code: updateBannerMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdateBannerMasterError({
          data: updateBannerMasterResponse.Response,
          message: updateBannerMasterResponse.errorMessage,
          status_code: updateBannerMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onUpdateBannerMasterError({ data: {}, message, status_code: 400 })
    );
  }
}

export default function* bannerMasterSaga() {
  yield takeLatest(onGetbannerMaster.type, BannerMaster);
  yield takeLatest(onbannerMasterSubmit.type, postBannerMaster);
  yield takeLatest(onUpdateBannerMaster.type, updateBannerMaster);
}
