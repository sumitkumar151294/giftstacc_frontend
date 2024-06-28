import { call, put, takeLatest } from "redux-saga/effects";

import { faqCategoryGetApi,faqCategoryPostApi} from "../../Context/ClientAdmin/faqCategoryApi";
import { onFaqCategorySubmit,onFaqCategorySubmitSuccess,onFaqCategorySubmitError,onGetFaqCategory,onGetFaqCategorySuccess,onGetFaqCategoryError } from "../../Store/Slices/ClientAdmin/faqCategorySlice";

function* FaqCategory() {
  try {
    const FaqCategoryResponse = yield call(faqCategoryGetApi);
    if (FaqCategoryResponse.httpStatusCode === "200") {
                yield put(
        onGetFaqCategorySuccess({
          data: FaqCategoryResponse.response,
          message: FaqCategoryResponse.errorMessage,
          status_code: FaqCategoryResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetFaqCategoryError({
          data: FaqCategoryResponse.response,
          message: FaqCategoryResponse.errorMessage,
          status_code: FaqCategoryResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onGetFaqCategoryError({
        data: {},
        message,
        status_code: error?.response?.data?.httpStatusCode,
      })
    );
  }
}
function* postFaqCategory({ payload }) {
  try {
    const FaqCategoryResponse = yield call(faqCategoryPostApi, payload);
    if (FaqCategoryResponse.httpStatusCode === "201") {
          yield put(
        onFaqCategorySubmitSuccess({
          data: FaqCategoryResponse.response,
          message: FaqCategoryResponse.errorMessage,
          status_code: FaqCategoryResponse.httpStatusCode,        })
      );
    } else {
      yield put(
        onFaqCategorySubmitError({
          data: FaqCategoryResponse.response,
          message: FaqCategoryResponse.errorMessage,
          status_code: FaqCategoryResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onFaqCategorySubmitError({
        data: {},
        message,
        status_code: error?.response?.data?.httpStatusCode,
      })
    );
  }
}
export default function* FaqCategorySaga() {
  yield takeLatest(onFaqCategorySubmit.type, postFaqCategory);
  yield takeLatest(onGetFaqCategory.type, FaqCategory);
}
