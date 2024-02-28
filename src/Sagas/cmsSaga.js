import { call, put, takeLatest } from "redux-saga/effects";
import { onGetCms, onGetCmsError, onGetCmsSuccess, onPostCms, onPostCmsError, onPostCmsSuccess } from "../Store/Slices/cmsSlice";
import { callCmsPostAPI, callCmsgetAPI } from "../Context/cmsApi";

function* postCms({ payload }) {
  try {
    const cmsPostResponse = yield call(callCmsPostAPI, payload);
    if (cmsPostResponse) {
      yield put(
        onPostCmsSuccess({
          data: cmsPostResponse.response,
          message: cmsPostResponse.response,
        })
      );
    } else {
      yield put(
        onPostCmsError({
          data: cmsPostResponse.response,
          message: cmsPostResponse.errorMessage,
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
      debugger;
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
    const message = error.response || "Something went wrong";
    yield put(onGetCmsError({ data: {}, message, status_code: 400 }));
  }
}
export default function* cmsSaga() {
  yield takeLatest(onPostCms.type, postCms);
  yield takeLatest(onGetCms.type, getCms);
}
