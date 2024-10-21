import { call, put, takeLatest } from "redux-saga/effects";
import {
  onClientConfigurationSubmit,
  onClientConfigurationSubmitSuccess,
  onClientConfigurationSubmitError,
  onPostClientConfigurationSubmit,
  onPostClientConfigurationSubmitSuccess,
  onPostClientConfigurationSubmitError,
  onUpdateClientConfigurationSubmitSuccess,
  onUpdateClientConfigurationSubmitError,
  onUpdateClientConfigurationSubmit,
} from "../../Store/Slices/ClientAdmin/clientConfigurationSlice";
import {
  getClientConfigureApi,
  postClientConfigureApi,
  updateClientConfigureApi,
} from "../../Context/ClientAdmin/clientConfigurationApi";

function* clientConfiguration() {
  try {
    const clientConfiguration = yield call(getClientConfigureApi);
    if (clientConfiguration.httpStatusCode === "200") {
      yield put(
        onClientConfigurationSubmitSuccess({
          data: clientConfiguration.response,
          message: clientConfiguration.errorMessage,
        })
      );
    } else {
      yield put(
        onClientConfigurationSubmitError({
          data: clientConfiguration.response,
          message: clientConfiguration.errorMessage,
        })
      );
    }
  } catch (error) {
    debugger
    const message = error?.response || "Something went wrong";
    yield put(
      onClientConfigurationSubmitError({ data: [], message, status_code: 400 })
    );
  }
}
function* postClientConfiguration({ payload }) {
  try {
    const postClientConfigurationResponse = yield call(
      postClientConfigureApi,
      payload
    );
    debugger
    if (postClientConfigurationResponse.httpStatusCode === "201") {
      yield put(
        onPostClientConfigurationSubmitSuccess({
          postData: postClientConfigurationResponse.response,
          message: postClientConfigurationResponse.errorMessage,
          httpStatusCode: postClientConfigurationResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostClientConfigurationSubmitError({
          data: postClientConfigurationResponse.response,
          message: postClientConfigurationResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    debugger
    yield put(
      onPostClientConfigurationSubmitError({
        data: [],
        message: error?.response?.data?.ErrorMessage,
        status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}
function* updateClientConfiguration({ payload }) {
  try {
    const updateClientMasterResponse = yield call(
      updateClientConfigureApi,
      payload
    );
    if (updateClientMasterResponse.httpStatusCode === "201") {
      yield put(
        onUpdateClientConfigurationSubmitSuccess({
          data: updateClientMasterResponse.Response,
          message: updateClientMasterResponse.errorMessage,
          status_code: updateClientMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdateClientConfigurationSubmitError({
          data: updateClientMasterResponse.Response,
          message: updateClientMasterResponse.errorMessage,
          status_code: updateClientMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onUpdateClientConfigurationSubmitError({
        data: [],
        message,
        status_code: 400,
      })
    );
  }
}

export default function* ClientConfigurationSaga() {
  yield takeLatest(onClientConfigurationSubmit.type, clientConfiguration);
  yield takeLatest(
    onPostClientConfigurationSubmit.type,
    postClientConfiguration
  );
  yield takeLatest(
    onUpdateClientConfigurationSubmit.type,
    updateClientConfiguration
  );
}
