import { call, put, takeLatest } from "redux-saga/effects";
import { onGetSupplierBrandList, onGetSupplierBrandListError, onGetSupplierBrandListSuccess, onPostSupplierBrandList, onPostSupplierBrandListError, onPostSupplierBrandListSuccess } from "../Store/Slices/supplierBrandListSlice";
import { callSupplierBrandListGetApi, callSupplierBrandListPostApi } from "../Context/supplierBrandListApi";



function* supplierBrandList({ payload }) {
  try {
    const supplierBrandListResponse = yield call(
      callSupplierBrandListPostApi,
      payload
    );
    if (supplierBrandListResponse.status === 5) {
      yield put(
        onPostSupplierBrandListSuccess({
          data: supplierBrandListResponse.result,
          message: supplierBrandListResponse.result.message,
        })
      );
    } else {
      yield put(
        onPostSupplierBrandListError({
          data: supplierBrandListResponse.result,
          message: supplierBrandListResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostSupplierBrandListError({ data: {}, message, status_code: 400 }));
  }
}
function* onGetSupplierList() {
  try {
    const supplierBrandListResponse = yield call(callSupplierBrandListGetApi);
    if (supplierBrandListResponse.httpStatusCode==="200") {
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
  yield takeLatest(onPostSupplierBrandList.type, supplierBrandList);
  yield takeLatest(onGetSupplierBrandList.type, onGetSupplierList);
}
