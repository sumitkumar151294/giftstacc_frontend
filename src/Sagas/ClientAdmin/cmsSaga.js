import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGetCms,
  onGetCmsError,
  onGetCmsSuccess,
  onPostCms,
  onPostCmsError,
  onPostCmsSuccess,
  onUpdateCms,
  onUpdateCmsError,
  onUpdateCmsSuccess,
} from "../../Store/Slices/ClientAdmin/cmsSlice";
import {
  callCmsPostAPI,
  callCmsgetAPI,
  callCmsupdateAPI,
} from "../../Context/ClientAdmin/cmsApi";

function* postCms({ payload }) {
  try {
    const cmsPostResponse = yield call(callCmsPostAPI, payload);
    if (cmsPostResponse.httpStatusCode === "201") {
      yield put(
        onPostCmsSuccess({
          getdata: cmsPostResponse.response,
          message: cmsPostResponse.errorMessage,
          status_code: cmsPostResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostCmsError({
          data: cmsPostResponse.response,
          message: cmsPostResponse.errorMessage,
          status_code: cmsPostResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostCmsError({ data: {}, message, status_code: 400 }));
  }
}
function* getCms() {
  try {
    const cmsgetResponse = yield call(callCmsgetAPI);

    if (cmsgetResponse.httpStatusCode === "200") {
      yield put(
        onGetCmsSuccess({
          data: cmsgetResponse.response,
          message: cmsgetResponse.errorMessage,
          status_code: cmsgetResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetCmsError({
          data: cmsgetResponse.response,
          message: cmsgetResponse.errorMessage,
          status_code: cmsgetResponse.httpStatusCode,
        })
      );
    }
  } catch (error) { 
    const message = error.message || "Something went wrong";
    yield put(onGetCmsError({ data: {}, message, status_code: error.response.status }));
  }
}
function* updateCms({ payload }) {
  try {
    const cmsupdateResponse = yield call(callCmsupdateAPI, payload);

    if (cmsupdateResponse.httpStatusCode === "201") {
      yield put(
        onUpdateCmsSuccess({
          data: cmsupdateResponse.response,
          message: cmsupdateResponse.errorMessage,
          status_code: cmsupdateResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdateCmsError({
          data: cmsupdateResponse.response,
          message: cmsupdateResponse.errorMessage,
          status_code: cmsupdateResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    yield put(
      onUpdateCmsError({
        updatedCmsData: {},
        updateMessage: error?.response?.data?.ErrorMessage,
        update_status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}
export default function* cmsSaga() {
  yield takeLatest(onPostCms.type, postCms);
  yield takeLatest(onGetCms.type, getCms);
  yield takeLatest(onUpdateCms.type, updateCms);
}
