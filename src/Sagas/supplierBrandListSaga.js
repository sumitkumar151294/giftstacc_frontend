import { call, put, takeLatest } from "redux-saga/effects";
import { onGetSupplierBrandList, onGetSupplierBrandListError, onGetSupplierBrandListSuccess, onUpdateSupplierBrandList, onUpdateSupplierBrandListError, onUpdateSupplierBrandListSuccess } from "../Store/Slices/supplierBrandListSlice";
import { callSupplierBrandListGetApi, callSupplierBrandListUpdateApi } from "../Context/supplierBrandListApi";



function* supplierBrandList({ payload }) {
  try {
    const supplierBrandListResponse = yield call(
      callSupplierBrandListUpdateApi,
      payload
    );
    if (supplierBrandListResponse?.httpStatusCode ==="201" ) {
          yield put(
        onUpdateSupplierBrandListSuccess({
          message: supplierBrandListResponse.errorMessage,
          status_code:supplierBrandListResponse?.httpStatusCode
        })
      );
    } else {
      yield put(
        onUpdateSupplierBrandListError({
          message: supplierBrandListResponse.errorMessage,
          status_code:supplierBrandListResponse?.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateSupplierBrandListError({ data: {}, message, status_code: 400 }));
  }
}
function* onGetSupplierList({payload}) {
  try {
    const supplierBrandListResponse = yield call(callSupplierBrandListGetApi,payload);
    if (supplierBrandListResponse?.httpStatusCode ==="200") {
      yield put(
        onGetSupplierBrandListSuccess({
          data: supplierBrandListResponse.response,
          message: supplierBrandListResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetSupplierBrandListError({
          data: supplierBrandListResponse.result,
          message: supplierBrandListResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetSupplierBrandListError({ data: [], message, status_code: 400 }));
  }
}

export default function* supplierBrandListSaga() {
  yield takeLatest(onUpdateSupplierBrandList.type, supplierBrandList);
  yield takeLatest(onGetSupplierBrandList.type, onGetSupplierList);
}
