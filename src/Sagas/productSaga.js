import { call, put, takeLatest } from "redux-saga/effects";
import { callProductByIdApi } from "../Context/productApi";
import {
  onProductByIdSubmit,
  onProductByIdSuccess,
  onProductByIdError,
} from "../Store/Slices/productSlice";
function* productsApi({ payload }) {
  try {
    const userMasterResponse = yield call(callProductByIdApi, payload);
    if (userMasterResponse.httpStatusCode === "200") {
      yield put(
        onProductByIdSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onProductByIdError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onProductByIdError({ data: {}, message, status_code: 400 }));
  }
}

export default function* productApiSaga() {
  yield takeLatest(onProductByIdSubmit.type, productsApi);
}
