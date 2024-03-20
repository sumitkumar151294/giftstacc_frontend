import { call, put, takeLatest } from "redux-saga/effects";
import { onPostAllocateBrand,onGetAllocateBrand,onGetAllocateBrandError,onGetAllocateBrandSuccess, onPostAllocateBrandError, onPostAllocateBrandSuccess, onUpdateAllocateBrand, onUpdateAllocateBrandError, onUpdateAllocateBrandSuccess,onAllocateBrandByIdSuccess,onAllocateBrandByIdError,onAllocateBrandById ,onUpdateAllocateBrandById,onUpdateAllocateBrandByIdSuccess,onUpdateAllocateBrandByIdError} from "../../Store/Slices/ClientAdmin/allocateBrandSlice";
import { callAddSpecialListPostApi, callAddSpecialListUpdateApi,callAddSpecialListGetApi } from "../../Context/ClientAdmin/addSpecialListApi";
import { callAllocateBrandsUpdateApi, callAllocateBrandsbyIdApi } from "../../Context/ClientAdmin/allocateBrandApi";
function* getAddSpecial() {
    try {
      const allocateBrandsgetResponse = yield call(callAddSpecialListGetApi);
  
      if (allocateBrandsgetResponse.httpStatusCode === "200") {
            yield put(
            onGetAllocateBrandSuccess({
            data: allocateBrandsgetResponse.response,
            message: allocateBrandsgetResponse.errorMessage,
            status_code: allocateBrandsgetResponse.httpStatusCode,
          })
        );
      } else {
        yield put(
            onGetAllocateBrandError({
            data: allocateBrandsgetResponse.response,
            message: allocateBrandsgetResponse.errorMessage,
            status_code: allocateBrandsgetResponse.httpStatusCode,
          })
        );
      }
    } catch (error) {
      const message = error.response || "Something went wrong";
      yield put(onGetAllocateBrandError({ data: {}, message, status_code: 400 }));
    }
  }
function* PostAllocateBrand({ payload }) {
    try {
            const postAlloacteBrandResponse = yield call(callAddSpecialListPostApi, payload);
        if (postAlloacteBrandResponse.httpStatusCode === "201") {
            yield put(
                onPostAllocateBrandSuccess({
                    postData: postAlloacteBrandResponse.response,
                    message: postAlloacteBrandResponse.errorMessage,
                    httpStatusCode: postAlloacteBrandResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onPostAllocateBrandError({
                    data: postAlloacteBrandResponse.response,
                    message: postAlloacteBrandResponse.errorMessage,
                })
            );
        }
    } catch (error) {
        yield put(
            onPostAllocateBrandError({ data: {}, message: error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode })
        );
    }
}
function* OnUpdateAllocateBrand({ payload }) {
    try {
        const updateAllocateBrandResponse = yield call(callAddSpecialListUpdateApi, payload);
        if (updateAllocateBrandResponse.httpStatusCode === "201") {
            yield put(
                onUpdateAllocateBrandSuccess({
                    data: updateAllocateBrandResponse.Response,
                    message: updateAllocateBrandResponse.errorMessage,
                    status_code: updateAllocateBrandResponse.httpStatusCode
                })
            );
        } else {
            yield put(
                onUpdateAllocateBrandError({
                    data: updateAllocateBrandResponse.Response,
                    message: updateAllocateBrandResponse.errorMessage,
                    status_code: updateAllocateBrandResponse.httpStatusCode
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onUpdateAllocateBrandError({ data: {}, message, status_code: 400 })
        );
    }
}
function* getAllocateBrandsById({ payload }) {
    try {
        const AllocateBrandResponseById = yield call(callAllocateBrandsbyIdApi, payload);
        if (AllocateBrandResponseById.httpStatusCode === "200") {
                yield put(
                onAllocateBrandByIdSuccess({
                    data: AllocateBrandResponseById.response,
                    message: AllocateBrandResponseById.errorMessage,
                    status_code: AllocateBrandResponseById.httpStatusCode
                })
            );
        } else {
                yield put(
                onAllocateBrandByIdError({
                    data: AllocateBrandResponseById.response,
                    message: AllocateBrandResponseById.errorMessage,
                    status_code: AllocateBrandResponseById.httpStatusCode
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onAllocateBrandByIdError({ data: {}, message, status_code: 400 })
        );
    }
}
function* updateAllocateBrandsById( {payload} ) {
    try {
        const updateAllocateBrandResponseById = yield call(callAllocateBrandsUpdateApi, payload);
        if (updateAllocateBrandResponseById.httpStatusCode === "201") {
                yield put(
                onUpdateAllocateBrandByIdSuccess({
                    data: updateAllocateBrandResponseById.response,
                    message: updateAllocateBrandResponseById.errorMessage,
                    status_code: updateAllocateBrandResponseById.httpStatusCode
                })
            );
        } else {
                yield put(
                onUpdateAllocateBrandByIdError({
                    data: updateAllocateBrandResponseById.response,
                    message: updateAllocateBrandResponseById.errorMessage,
                    status_code: updateAllocateBrandResponseById.httpStatusCode
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onUpdateAllocateBrandByIdError({ data: {}, message, status_code: 400 })
        );
    }
}


export default function* allocateBrandSaga() {
    yield takeLatest(onPostAllocateBrand.type, PostAllocateBrand);
    yield takeLatest(onUpdateAllocateBrand.type, OnUpdateAllocateBrand);
    yield takeLatest(onGetAllocateBrand.type, getAddSpecial);
    yield takeLatest(onAllocateBrandById.type, getAllocateBrandsById);
    yield takeLatest(onUpdateAllocateBrandById.type, updateAllocateBrandsById);



}
