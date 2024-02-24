import { call, put, takeLatest } from "redux-saga/effects";
import { onCmsSubmit } from "../Store/Slices/cmsSlice";
import { callCreateCategoryGetApi } from "../Context/createcategoryApi";
import { callCmsPostAPI } from "../Context/cmsApi";


function* postCms({payload}) {
  debugger
  try {
    const cmsPostResponse = yield call(callCmsPostAPI, payload);

    // if (getCategoryResponse.httpStatusCode === "200") {
    //   yield put(
    //     onGetCategorySuccess({
    //       data: getCategoryResponse.response,
    //       message: getCategoryResponse.response,
    //     })
    //   );
    // } else {
    //   yield put(
    //     onGetCategoryError({
    //       data: getCategoryResponse.response,
    //       message: getCategoryResponse.errorMessage,
    //     })
    //   );
    // }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    // yield put(onGetCategoryError({ data: {}, message, status_code: 400 }));
  }
}

export default function* cmsSaga() {
  yield takeLatest(onCmsSubmit.type, postCms);

}
