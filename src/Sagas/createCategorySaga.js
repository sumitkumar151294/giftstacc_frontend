import { call, put, takeLatest } from "redux-saga/effects";
import { callCreateCategoryGetApi, callCreateCategoryPostApi } from "../Context/createcategoryApi";
import { onGetCategory, onGetCategoryError, onGetCategorySuccess, onPostCategory, onPostCategoryError, onPostCategorySuccess } from "../Store/Slices/createCategorySlice";

function* GetCategory() {
  try {
    const getCategoryResponse = yield call(callCreateCategoryGetApi);
    if (getCategoryResponse.status === 5) {
      yield put(
        onGetCategorySuccess({
          data: getCategoryResponse.result,
          message: getCategoryResponse.result.message,
        })
      );
    } else {
      yield put(
        onGetCategoryError({
          data: getCategoryResponse.result,
          message: getCategoryResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetCategoryError({ data: {}, message, status_code: 400 }));
  }
}
function* PostCategory({ payload }) {
  try {
    const postCategoryResponse = yield call(callCreateCategoryPostApi, payload);
    if (postCategoryResponse.status === 5) {
      yield put(
        onPostCategorySuccess({
          data: postCategoryResponse.result,
          message: postCategoryResponse.result.message,
        })
      );
    } else {
      yield put(
        onPostCategoryError({
          data: postCategoryResponse.result,
          message: postCategoryResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostCategoryError({ data: {}, message, status_code: 400 }));
  }
}

export default function* createCategorySaga() {
  yield takeLatest(onGetCategory.type, GetCategory);
  yield takeLatest(onPostCategory.type, PostCategory);
}
