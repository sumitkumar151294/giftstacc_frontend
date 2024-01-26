import { call, put, select, takeLatest } from "redux-saga/effects";
import { translationApi } from "../Context/translationApi";
import {
  onTranslationSubmitError,
  onTranslationSubmitSuccess,
  onTranslationSubmit,
} from "../Store/Slices/translationSlice";

function* Translation() {
  try {
    const loginAuthData = yield select((state) => state.loginAuthReducer.data);

    const translationResponse = yield call(translationApi,loginAuthData[0].clientId,loginAuthData[0].token);
    if (translationResponse.httpStatusCode === 200) {
      yield put(
        onTranslationSubmitSuccess({
          data: translationResponse.response,
          message: translationResponse.response,
        })
      );
    } else {
      yield put(
        onTranslationSubmitError({
          data: translationResponse.response,
          message: translationResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onTranslationSubmitError({ data: {}, message, httpStatusCode: 400 })
    );
  }
}
export default function* translationSaga() {
  yield takeLatest(onTranslationSubmit.type, Translation);
}
