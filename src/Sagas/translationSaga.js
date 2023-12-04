import { call, put, takeLatest } from "redux-saga/effects";
import { translationApi } from "../Context/translationApi";
import {
  onTranslationSubmitError,
  onTranslationSubmitSuccess,
  onTranslationSubmit,
} from "../Store/Slices/translationSlice";

function* Translation() {
  try {
    const translationResponse = yield call(translationApi);
    if (translationResponse.code === 1) {
      yield put(
        onTranslationSubmitSuccess({
          data: translationResponse.data,
          message: translationResponse.message,
        })
      );
    } else {
      yield put(
        onTranslationSubmitError({
          data: translationResponse.data,
          message: translationResponse.message,
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
