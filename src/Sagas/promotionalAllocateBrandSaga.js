import { call, put, takeLatest } from "redux-saga/effects";
import { onGetAllPromotionalAllocateBrand, onGetAllPromotionalAllocateBrandError, onGetAllPromotionalAllocateBrandSuccess, onGetPromotionalAllocateBrandByPromotionalId, onGetPromotionalAllocateBrandByPromotionalIdError, onGetPromotionalAllocateBrandByPromotionalIdSuccess, onPostPromotionalAllocateBrand, onPostPromotionalAllocateBrandError, onPostPromotionalAllocateBrandSuccess, onPutPromotionalAllocateBrand, onPutPromotionalAllocateBrandError, onPutPromotionalAllocateBrandSuccess } from "../Store/Slices/promotionalAllocateBrandSlice";
import { getByPromotionalIdApi, promotionalAllocateBrandGetApi, promotionalAllocateBrandPostApi, promotionalAllocateBrandPutApi } from "../Context/promotionalAllocateBrandApi";

function* promotionalAllocateBrandByPromotionalId({ payload }) {
    try {
        const promotionalAllocateBrandByPromotionalIdResponse = yield call(getByPromotionalIdApi, payload);
        if (promotionalAllocateBrandByPromotionalIdResponse?.httpStatusCode === "200") {
            yield put(
                onGetPromotionalAllocateBrandByPromotionalIdSuccess({
                    data: promotionalAllocateBrandByPromotionalIdResponse.response,
                    message: promotionalAllocateBrandByPromotionalIdResponse.errorMessage,
                    status_code: promotionalAllocateBrandByPromotionalIdResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onGetPromotionalAllocateBrandByPromotionalIdError({
                    data: promotionalAllocateBrandByPromotionalIdResponse.response,
                    message: promotionalAllocateBrandByPromotionalIdResponse.errorMessage,
                    status_code: promotionalAllocateBrandByPromotionalIdResponse.httpStatusCode,
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onGetPromotionalAllocateBrandByPromotionalIdError({ data: {}, message, status_code: 400 })
        );
    }
}
function* putPromotionalAllocateBrand({ payload }) {
    try {
        const putPromotionalAllocateBrandResponse = yield call(promotionalAllocateBrandPutApi, payload );
        if (putPromotionalAllocateBrandResponse.httpStatusCode === "201") {
            yield put(
                onPutPromotionalAllocateBrandSuccess({
                    data: putPromotionalAllocateBrandResponse.response,
                    message: putPromotionalAllocateBrandResponse.errorMessage,
                    status_code: putPromotionalAllocateBrandResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onPutPromotionalAllocateBrandError({
                    data: putPromotionalAllocateBrandResponse.response,
                    message: putPromotionalAllocateBrandResponse.errorMessage,
                    status_code: putPromotionalAllocateBrandResponse.httpStatusCode,
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onPutPromotionalAllocateBrandError({
                data: {},
                message,
                status_code: 400,
            })
        );
    }
}
function* postPromotionalAllocateBrand({ payload }) {
    try {
        const postPromotionalAllocateBrandResponse = yield call(promotionalAllocateBrandPostApi, payload);
        if (postPromotionalAllocateBrandResponse.httpStatusCode === "201") {
            yield put(
                onPostPromotionalAllocateBrandSuccess({
                    data: postPromotionalAllocateBrandResponse.response,
                    message: postPromotionalAllocateBrandResponse.errorMessage,
                    status_code: postPromotionalAllocateBrandResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onPostPromotionalAllocateBrandError({
                    data: postPromotionalAllocateBrandResponse.response,
                    message: postPromotionalAllocateBrandResponse.errorMessage,
                    status_code: postPromotionalAllocateBrandResponse.httpStatusCode,
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onPostPromotionalAllocateBrandError({
                data: {},
                message,
                status_code: 400,
            })
        );
    }
}
function* getAllPromotionalAllocateBrand() {
    try {
        const getAllPromotionalAllocateBrandResponse = yield call(promotionalAllocateBrandGetApi);
        if (getAllPromotionalAllocateBrandResponse.httpStatusCode === "200") {
            yield put(
                onGetAllPromotionalAllocateBrandSuccess({
                    data: getAllPromotionalAllocateBrandResponse.response,
                    message: getAllPromotionalAllocateBrandResponse.errorMessage,
                    status_code: getAllPromotionalAllocateBrandResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onGetAllPromotionalAllocateBrandError({
                    data: getAllPromotionalAllocateBrandResponse.response,
                    message: getAllPromotionalAllocateBrandResponse.errorMessage,
                    status_code: getAllPromotionalAllocateBrandResponse.httpStatusCode,
                })
            );
        }
    } catch (error) {
        const message = error.message || "Something went wrong";
        yield put(
            onGetAllPromotionalAllocateBrand({
                data: {},
                message,
                status_code: error.response.status,
            })
        );
    }
}
export default function* promotionalAllocateBrandSaga() {
    yield takeLatest(onGetPromotionalAllocateBrandByPromotionalId.type, promotionalAllocateBrandByPromotionalId);
    yield takeLatest(onPostPromotionalAllocateBrand.type, postPromotionalAllocateBrand);
    yield takeLatest(onPutPromotionalAllocateBrand.type, putPromotionalAllocateBrand);
    yield takeLatest(onGetAllPromotionalAllocateBrand.type, getAllPromotionalAllocateBrand);
}
