import { call, put, takeLatest } from "redux-saga/effects";
import { callCreateCategoryGetApi, callCreateCategoryPostApi, callCreateCategoryUpdateApi } from "../Context/createcategoryApi";
import { onGetCategory, onGetCategoryError, onGetCategorySuccess, onPostCategory, onPostCategoryError, onPostCategorySuccess, onUpdateCategory, onUpdateCategorySuccess, onUpdateCategoryError } from "../Store/Slices/createCategorySlice";

function* GetCategory() {
  try {
    const getCategoryResponse = yield call(callCreateCategoryGetApi);
    if (getCategoryResponse.httpStatusCode === 200) {
      yield put(
        onGetCategorySuccess({
          data: getCategoryResponse.response,
          message: getCategoryResponse.response,
        })
      );
    } else {
      yield put(
        onGetCategoryError({
          data: getCategoryResponse.response,
          message: getCategoryResponse.errorMessage,
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

function* UpdateCategory({ payload }) {
  try {
    const updateCategoryResponse = yield call(callCreateCategoryUpdateApi, payload);
    if (updateCategoryResponse.status === 5) {
      yield put(
        onUpdateCategorySuccess({
          data: updateCategoryResponse.result,
          message: updateCategoryResponse.result.message,
        })
      );
    } else {
      yield put(
        onUpdateCategoryError({
          data: updateCategoryResponse.result,
          message: updateCategoryResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateCategoryError({ data: {}, message, status_code: 400 }));
  }
}

export default function* createCategorySaga() {
  yield takeLatest(onGetCategory.type, GetCategory);
  yield takeLatest(onPostCategory.type, PostCategory);
  yield takeLatest(onUpdateCategory.type, UpdateCategory);
}
