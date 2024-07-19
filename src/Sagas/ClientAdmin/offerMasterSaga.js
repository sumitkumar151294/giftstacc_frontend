import { call, put, takeLatest } from "redux-saga/effects";

import {
  onUploadImageApi,
  callOfferMasterGetApi,
  callOfferMasterPostApi,
  callOfferMasterUpdateApi,
} from "../../Context/ClientAdmin/offerMasterApi";
import {
  onGetOfferMaster,
  onGetOfferMasterError,
  onGetOfferMasterSuccess,
  onPostOfferMasterError,
  onPostOfferMasterSubmit,
  onPostOfferMasterSuccess,
  onUpdateOfferMaster,
  onUpdateOfferMasterError,
  onUpdateOfferMasterSuccess,
  onUploadImageError,
  onUploadImageSuccess,
  onUploadImage,
  onUploadImageMobileSuccess,
  onUploadImageMobileError,
  onUploadImageMobile,
} from "../../Store/Slices/ClientAdmin/offerMasterSlice";

function* PostOfferMaster({ payload }) {
  try {
    const postOfferMasterResponse = yield call(callOfferMasterPostApi, payload);
    if (postOfferMasterResponse.httpStatusCode === "201") {
      yield put(
        onPostOfferMasterSuccess({
          postData: postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          postStatus_code: postOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostOfferMasterError({
          postData: postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          postStatus_code: postOfferMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    yield put(
      onPostOfferMasterError({
        postData: [],
        message: error?.response?.data?.ErrorMessage,
        postStatus_code: error?.response?.data?.HttpStatusCode,
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
    const message = error.message || "Something went wrong";
    yield put(
      onGetOfferMasterError({
        getData: [],
        message,
        status_code: error.response.status,
      })
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
    yield put(
      onUpdateOfferMasterError({
        updateData: [],
        updateMessage: error?.response?.data?.ErrorMessage,
        update_status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}
function* OnImageUpload({ payload }) {
  try {
    const ImageUpload = yield call(onUploadImageApi, payload);
    if (ImageUpload.httpStatusCode === "201") {
      yield put(
        onUploadImageSuccess({
          data: ImageUpload.response,
          message: ImageUpload.errorMessage,
          status_code_Image: ImageUpload.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUploadImageError({
          data: ImageUpload.response,
          message: ImageUpload.errorMessage,
          status_code_Image: ImageUpload.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUploadImageError({ data: [], message, status_code: 400 }));
  }
}
function* OnImageMobileUpload({ payload }) {
  try {
    const ImageMobileUpload = yield call(onUploadImageApi, payload);
    if (ImageMobileUpload.httpStatusCode === "201") {
      yield put(
        onUploadImageMobileSuccess({
          data: ImageMobileUpload.response,
          message: ImageMobileUpload.errorMessage,
          status_code_MobileImage: ImageMobileUpload.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUploadImageMobileError({
          data: ImageMobileUpload.response,
          message: ImageMobileUpload.errorMessage,
          status_code_MobileImage: ImageMobileUpload.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUploadImageError({ data: [], message, status_code: 400 }));
  }
}
export default function* offerMasterSaga() {
  yield takeLatest(onPostOfferMasterSubmit.type, PostOfferMaster);
  yield takeLatest(onGetOfferMaster.type, GetOfferMaster);
  yield takeLatest(onUploadImage.type, OnImageUpload);
  yield takeLatest(onUploadImageMobile.type, OnImageMobileUpload);
  yield takeLatest(onUpdateOfferMaster.type, PutOfferMaster);
}
