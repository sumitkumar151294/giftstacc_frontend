import { call, put, takeLatest } from "redux-saga/effects";
import { getPointsApi, updatePointsApi } from "../Context/clientConfigurationApi";
import { postPointsApi } from "../Context/clientConfigurationApi";
import {
    onClientConfiqurationSubmit,
    onClientConfiqurationSubmitSuccess,
    onClientConfiqurationSubmitError,
    onPostClientConfiqurationSubmit,
    onPostClientConfiqurationSubmitSuccess,
    onPostClientConfiqurationSubmitError,
  onUpdateClientMasterSubmit,
 
  onUpdateClientConfiqurationSubmitSuccess,
  onUpdateClientConfiqurationSubmitError,
  onUpdateClientConfiqurationSubmit,
} from "../Store/Slices/clientConfiqurationSlice";

function* ClientConfiguration() {
  try {
    const clientConfiguration = yield call(getPointsApi);
    if (clientConfiguration.httpStatusCode === "200") {
      yield put(
        onClientConfiqurationSubmitSuccess({
          data: clientConfiguration.response,
          message: clientConfiguration.errorMessage,
        })
      );
    } else {
      yield put(
        onClientConfiqurationSubmitError({
          data: clientConfiguration.response,
          message: clientConfiguration.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onClientConfiqurationSubmitError({ data: [], message, status_code: 400 })
    );
  }
}
function* postClientConfiquration({ payload }) {
    debugger
  try {
        const postClientConfiqurationResponse = yield call(postPointsApi, payload);
    if (postClientConfiqurationResponse.httpStatusCode === "201") {
      yield put(
        onPostClientConfiqurationSubmitSuccess({
          postData: postClientConfiqurationResponse.response,
          message: postClientConfiqurationResponse.errorMessage,
          httpStatusCode: postClientConfiqurationResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostClientConfiqurationSubmitError({
          data: postClientConfiqurationResponse.response,
          message: postClientConfiqurationResponse.errorMessage,
                  })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
        yield put(
      onPostClientConfiqurationSubmitError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode })
    );
  }
}
function* updateClientMaster({ payload }) {
  try {
    const updateClientMasterResponse = yield call(  updatePointsApi, payload);
        if (updateClientMasterResponse.httpStatusCode === "201") {
      yield put(
        onUpdateClientConfiqurationSubmitSuccess({
          data: updateClientMasterResponse.Response,
          message: updateClientMasterResponse.errorMessage,
          status_code: updateClientMasterResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onUpdateClientConfiqurationSubmitError({
          data: updateClientMasterResponse.Response,
          message: updateClientMasterResponse.errorMessage,
          status_code: updateClientMasterResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onUpdateClientConfiqurationSubmitError({ data: [], message, status_code: 400 })
    );
  }
}

export default function* ClientConfigurationSaga() {
  yield takeLatest(onClientConfiqurationSubmit.type, ClientConfiguration);
  yield takeLatest(onPostClientConfiqurationSubmit.type, postClientConfiquration);
  yield takeLatest(onUpdateClientConfiqurationSubmit.type, updateClientMaster);
}
