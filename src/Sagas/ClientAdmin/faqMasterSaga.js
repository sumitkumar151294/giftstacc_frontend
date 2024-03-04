import { call, put, takeLatest } from "redux-saga/effects";
import {
  onFaqMasterSubmit,
  onFaqMasterSubmitSuccess,
  onFaqMasterSubmitError,
  onGetFaqMaster,
  onGetFaqMasterSuccess,
  onGetFaqMasterError,
} from "../../Store/Slices/ClientAdmin/faqMasterSlice";
import { faqMasterPostApi, faqMasterGetApi } from "../../Context/ClientAdmin/faqMasterApi";

function* FaqMaster() {
  try {
    const FaqMasterResponse = yield call(faqMasterGetApi);
    if (FaqMasterResponse.httpStatusCode === "200") {
            yield put(
        onGetFaqMasterSuccess({
          data: FaqMasterResponse.response,
          message: FaqMasterResponse.errorMessage,
          status_code: FaqMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetFaqMasterError({
          data: FaqMasterResponse.response,
          message: FaqMasterResponse.errorMessage,
          status_code: FaqMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onGetFaqMasterError({
        data: {},
        message,
        status_code: error?.response?.data?.httpStatusCode,
      })
    );
  }
}
function* postFaqMaster({ payload }) {
  try {
    const FaqMasterResponse = yield call(faqMasterPostApi, payload);
    if (FaqMasterResponse.httpStatusCode === "201") {
          yield put(
        onFaqMasterSubmitSuccess({
          data: FaqMasterResponse.response,
          message: FaqMasterResponse.errorMessage,
          status_code: FaqMasterResponse.httpStatusCode,        })
      );
    } else {
      yield put(
        onFaqMasterSubmitError({
          data: FaqMasterResponse.response,
          message: FaqMasterResponse.errorMessage,
          status_code: FaqMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onFaqMasterSubmitError({
        data: {},
        message,
        status_code: error?.response?.data?.httpStatusCode,
      })
    );
  }
}
export default function* FaqMasterSaga() {
  yield takeLatest(onFaqMasterSubmit.type, postFaqMaster);
  yield takeLatest(onGetFaqMaster.type, FaqMaster);
}
