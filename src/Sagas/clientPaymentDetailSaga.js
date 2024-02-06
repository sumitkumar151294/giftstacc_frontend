import { call, put, takeLatest } from "redux-saga/effects";
import {
  getClientPaymentApi,
  postClientPaymentApi,
  updateClientPaymentApi,
} from "../Context/clientPaymentDetailsApi";
import {
  onClientPaymentSubmit,
  onClientPaymentSubmitSuccess,
  onClientPaymentSubmitError,
  onPostClientPaymentSubmit,
  onPostClientPaymentSubmitSuccess,
  onPostClientPaymentSubmitError,
  onUpdateClientPaymentSubmit,
  onUpdateClientPaymentSubmitSuccess,
  onUpdateClientPaymentSubmitError,
} from "../Store/Slices/clientPaymentDetailSlice";

function* getClientPayment() {
  try {
    const ClientPayment = yield call(getClientPaymentApi);
    if (ClientPayment.httpStatusCode === "200") {
      yield put(
        onClientPaymentSubmitSuccess({
          data: ClientPayment.response,
          message: ClientPayment.errorMessage,
        })
      );
    } else {
      yield put(
        onClientPaymentSubmitError({
          data: ClientPayment.response,
          message: ClientPayment.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onClientPaymentSubmitError({ data: {}, message, status_code: 400 })
    );
  }
}
function* postClientPayment({ payload }) {
  try {
    const postClientPayment = yield call(postClientPaymentApi, payload);
    if (postClientPayment.httpStatusCode === "201") {
      yield put(
        onPostClientPaymentSubmitSuccess({
          data: postClientPayment.response,
          message: postClientPayment.errorMessage,
        })
      );
    } else {
      yield put(
        onPostClientPaymentSubmitError({
          data: postClientPayment.response,
          message: postClientPayment.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onPostClientPaymentSubmitError({ data: {}, message, status_code: 400 })
    );
  }
}
function* updateClientPayment(payload) {
  try {
    const updateClientPayment = yield call(
      updateClientPaymentApi,
      payload.payload
    );
    if (updateClientPayment.httpStatusCode === "200") {
      yield put(
        onUpdateClientPaymentSubmitSuccess({
          data: updateClientPayment.response,
          message: updateClientPayment.errorMessage,
        })
      );
    } else {
      yield put(
        onUpdateClientPaymentSubmitError({
          data: updateClientPayment.response,
          message: updateClientPayment.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onUpdateClientPaymentSubmitError({ data: {}, message, status_code: 400 })
    );
  }
}

export default function* clientPaymentSaga() {
  yield takeLatest(onClientPaymentSubmit.type, getClientPayment);
  yield takeLatest(onPostClientPaymentSubmit.type, postClientPayment);
  yield takeLatest(onUpdateClientPaymentSubmit.type, updateClientPayment);
}
