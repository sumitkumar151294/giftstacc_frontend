import { call, put, takeLatest } from "redux-saga/effects";
import {
  onVendorSubmit,
  onVendorSubmitSuccess,
  onVendorSubmitError,
  onGetSupplierList,
  onGetSupplierListSuccess,
  onGetSupplierListError,
  onUpdateSupplierListSuccess,
  onUpdateSupplierListError,
  onUpdateSupplierList,
} from "../Store/Slices/supplierMasterSlice";
import {
  callSupplierMasterPostApi,
  callSupplierMasterGetApi,
  updateSupplierMasterApi,
} from "../Context/supplierMasterApi";

function* supplierMaster({ payload }) {
  try {
    const supplierMasterResponse = yield call(
      callSupplierMasterPostApi,
      payload
    );
    if (supplierMasterResponse.httpStatusCode === "200") {
      yield put(
        onVendorSubmitSuccess({
          data: supplierMasterResponse.response,
          message: supplierMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onVendorSubmitError({
          data: supplierMasterResponse.response,
          message: supplierMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onVendorSubmitError({ data: {}, message, status_code: 400 }));
  }
}
function* onGetSupplier() {
  try {
    
    const supplierMasterResponse = yield call(callSupplierMasterGetApi);
    if (supplierMasterResponse.httpStatusCode === "200") {
      
      yield put(
        onGetSupplierListSuccess({
          data: supplierMasterResponse.response,
          message: supplierMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetSupplierListError({
          data: supplierMasterResponse.result,
          message: supplierMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetSupplierListError({ data: {}, message, status_code: 400 }));
  }
}
function* onUpdateSupplier(payload) {
  try {
    const supplierMasterResponse = yield call(
      updateSupplierMasterApi,
      payload.payload
    );
    if (supplierMasterResponse.httpStatusCode === "200") {
          yield put(
        onUpdateSupplierListSuccess({
          data: supplierMasterResponse.response,
          message: supplierMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onUpdateSupplierListError({
          data: supplierMasterResponse.response,
          message: supplierMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onUpdateSupplierListError({ data: {}, message, status_code: 400 })
    );
  }
}
export default function* supplierMasterSaga() {
  yield takeLatest(onVendorSubmit.type, supplierMaster);
  yield takeLatest(onGetSupplierList.type, onGetSupplier);
  yield takeLatest(onUpdateSupplierList.type, onUpdateSupplier);
}
