import { call, put, takeLatest } from "redux-saga/effects";
import { onGetPromtional, onGetPromtionalError, onGetPromtionalSuccess, onPromtionalSubmit, onPromtionalSubmitError, onPromtionalSubmitSuccess, onUpdatePromotional, onUpdatePromotionalError, onUpdatePromotionalSuccess } from "../Store/Slices/promotionalSlice";
import { promotionalGetApi, promotionalPostApi, promotionalUpdateApi } from "../Context/promotionalApi";

function* getPromotional() {
    try {
        const PromotionalResponse = yield call(promotionalGetApi);
        if (PromotionalResponse.httpStatusCode === "200") {
            yield put(
                onGetPromtionalSuccess({
                    data: PromotionalResponse.response,
                    message: PromotionalResponse.errorMessage,
                    status_code: PromotionalResponse.httpStatusCode
                })
            );
        } else {
            yield put(
                onGetPromtionalError({
                    data: PromotionalResponse.response,
                    message: PromotionalResponse.errorMessage,
                    status_code: PromotionalResponse.httpStatusCode
                })
            );
        }
    } catch (error) {
        const message = error.message || "Something went wrong";
        yield put(onGetPromtionalError({ data: {}, message, status_code: error.response.status }));
    }
}
function* postPromotional({ payload }) {
    try {
        const postPromotionalResponse = yield call(promotionalPostApi, payload);
        if (postPromotionalResponse.httpStatusCode === "201") {
            yield put(
                onPromtionalSubmitSuccess({
                    postData: postPromotionalResponse.response,
                    message: postPromotionalResponse.errorMessage,
                    status_code: postPromotionalResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onPromtionalSubmitError({
                    data: postPromotionalResponse.response,
                    message: postPromotionalResponse.errorMessage,
                    status_code: postPromotionalResponse.httpStatusCode

                })
            );
        }
    } catch (error) {
        yield put(
            onPromtionalSubmitError({
                data: {},
                message: error?.response?.data?.ErrorMessage,
                status_code: error?.response?.data?.HttpStatusCode,
            })
        );
    }
}
function* updatePromotional({ payload }) {
    try {
        const updatePromotionalResponse = yield call(promotionalUpdateApi, payload);
        if (updatePromotionalResponse.httpStatusCode === "201") {
            yield put(
                onUpdatePromotionalSuccess({
                    data: updatePromotionalResponse.Response,
                    message: updatePromotionalResponse.errorMessage,
                    status_code: updatePromotionalResponse.httpStatusCode,
                })
            );
        } else {
            yield put(
                onUpdatePromotionalError({
                    data: updatePromotionalResponse.Response,
                    message: updatePromotionalResponse.errorMessage,
                    status_code: updatePromotionalResponse.httpStatusCode,
                })
            );
        }
    } catch (error) {
        const message = error.response || "Something went wrong";
        yield put(
            onUpdatePromotionalError({ data: {}, message, status_code: 400 })
        );
    }
}

export default function* promotionalSaga() {
    yield takeLatest(onGetPromtional.type, getPromotional);
    yield takeLatest(onPromtionalSubmit.type, postPromotional);
    yield takeLatest(onUpdatePromotional.type, updatePromotional);
}
