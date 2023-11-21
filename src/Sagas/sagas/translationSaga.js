import { call, put, takeLatest } from "redux-saga/effects";
import {
  onTranslationSubmit,
  onTranslationSubmitSuccess,
  onTranslationSubmitError,
} from "../../Store/Slices/translationSlice";
import { translationApi } from "../../Context/translationApi";

function* Translation() {
  try {
    const translationResponse = yield call(translationApi);
    if (translationResponse.status === 200) {
      yield put(
        onTranslationSubmitSuccess({
          data: translationResponse.result.data,
          message: translationResponse.result.message,
        })
      );
    } else {
      yield put(
        onTranslationSubmitError({
          data: translationResponse.result.data,
          message: translationResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onTranslationSubmitError({ data: {}, message, status_code: 400 })
    );
  }
}
export default function* translationSaga() {
  yield takeLatest(onTranslationSubmit.type, Translation);
}