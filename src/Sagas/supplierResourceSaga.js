import { call, put, takeLatest } from "redux-saga/effects";
import {
  onSupplierResourceSubmit,
  onSupplierResourceSubmitSuccess,
  onSupplierResourceSubmitError,
  onGetSupplierResource,
  onGetSupplierResourceSuccess,
  onGetSupplierResourceError,
  onUpdateSupplierResource,
  onUpdateSupplierResourceSuccess,
  onUpdateSupplierResourceError,
} from "../Store/Slices/supplierResourceSlice";
import {
  postSupplierResourceApi,
  getSupplierResourceApi,
  updateSupplierResourceApi,
} from "../Context/supplierResourceApi";

function* supplierResource({ payload }) {
  try {
    const supplierResourceResponse = yield call(
      postSupplierResourceApi,
      payload
    );
    if (supplierResourceResponse.httpStatusCode === "201") {
      yield put(
        onSupplierResourceSubmitSuccess({
          data: supplierResourceResponse.response,
          message: supplierResourceResponse.errorMessage,
          status_code: supplierResourceResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onSupplierResourceSubmitError({
          data: supplierResourceResponse.response,
          message: supplierResourceResponse.errorMessage,
          status_code: supplierResourceResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onSupplierResourceSubmitError({ data: {}, message, status_code: 400 })
    );
  }
}
function* onGetSupplier() {
  try {
    const supplierResourceResponse = yield call(getSupplierResourceApi);
    if (supplierResourceResponse.httpStatusCode === "200") {
      yield put(
        onGetSupplierResourceSuccess({
          data: supplierResourceResponse.response,
          message: supplierResourceResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetSupplierResourceError({
          data: supplierResourceResponse.result,
          message: supplierResourceResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onGetSupplierResourceError({ data: {}, message, status_code: 400 })
    );
  }
}
function* onUpdateSupplier(payload) {
  try {
    const supplierResourceResponse = yield call(
      updateSupplierResourceApi,
      payload.payload
    );
    if (supplierResourceResponse.httpStatusCode === "201") {
      yield put(
        onUpdateSupplierResourceSuccess({
          data: supplierResourceResponse.response,
          message: supplierResourceResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onUpdateSupplierResourceError({
          data: supplierResourceResponse.response,
          message: supplierResourceResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onUpdateSupplierResourceError({ data: {}, message, status_code: 400 })
    );
  }
}
export default function* supplierResourceSaga() {
  yield takeLatest(onSupplierResourceSubmit.type, supplierResource);
  yield takeLatest(onGetSupplierResource.type, onGetSupplier);
  yield takeLatest(onUpdateSupplierResource.type, onUpdateSupplier);
}
