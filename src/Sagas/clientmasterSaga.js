import { call, put, takeLatest } from 'redux-saga/effects';
import { getClientMasterApi } from '../Context/clientMasterApi';
import { postClientMasterApi } from '../Context/clientMasterApi';
import { updateClientMasterApi } from '../Context/clientMasterApi';
import {
  onClientMasterSubmit,
  onClientMasterSubmitError,
  onClientMasterSubmitSuccess,
  onPostClientMasterSubmitSuccess,
  onPostClientMasterSubmitError,
  onPostClientMasterSubmit,onUpdateClientMasterSubmit,onUpdateClientMasterSubmitSuccess,onUpdateClientMasterSubmitError
} from '../Store/Slices/clientMasterSlice';

function* ClientMaster() {
  try {
          const clientMasterResponse = yield call(getClientMasterApi);
    if (clientMasterResponse.httpStatusCode === "200") {

      yield put(onClientMasterSubmitSuccess({ data: clientMasterResponse.response, message: clientMasterResponse.errorMessage}));
    } else {
          yield put(onClientMasterSubmitError({ data: clientMasterResponse.response, message: clientMasterResponse.errorMessage,  }));
    }
  } catch (error) {
      const message = error.response || 'Something went wrong';
    yield put(onClientMasterSubmitError({ data: {}, message, status_code: 400 }));
  }
}
function* postClientMaster(payload) {
    try {
        const postClientMasterResponse = yield call(postClientMasterApi,payload.payload.clientData);
      if (postClientMasterResponse.httpStatusCode === "200") {
              yield put(onPostClientMasterSubmitSuccess({ data: postClientMasterResponse.response, message: postClientMasterResponse.errorMessage}));
      } else {
            yield put(onPostClientMasterSubmitError({ data: postClientMasterResponse.response, message: postClientMasterResponse.errorMessage,  }));
      }
    } catch (error) {
        const message = error.response || 'Something went wrong';
      yield put(onClientMasterSubmitError({ data: {}, message, status_code: 400 }));
    }
  }
  function* updateClientMaster(payload) {
    try {
        const updateClientMasterResponse = yield call(updateClientMasterApi,payload.payload);
      if (updateClientMasterResponse.httpStatusCode === "200") {
            yield put(onUpdateClientMasterSubmitSuccess({ data: updateClientMasterResponse.response, message: updateClientMasterResponse.errorMessage}));
      } else {
            yield put(onUpdateClientMasterSubmitSuccess({ data: updateClientMasterResponse.response, message: updateClientMasterResponse.errorMessage,  }));
      }
    } catch (error) {
        const message = error.response || 'Something went wrong';
      yield put(onUpdateClientMasterSubmitError({ data: {}, message, status_code: 400 }));
    }
  }
  

export default function* clientMasterSaga() {
  yield takeLatest(onClientMasterSubmit.type, ClientMaster);
  yield takeLatest(onPostClientMasterSubmit.type, postClientMaster);
  yield takeLatest(onUpdateClientMasterSubmit.type, updateClientMaster);


}
