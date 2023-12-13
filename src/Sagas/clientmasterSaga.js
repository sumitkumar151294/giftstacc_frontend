import { call, put, takeLatest } from 'redux-saga/effects';
import { getClientMasterApi } from '../Context/clientMasterApi';
import { postClientMasterApi } from '../Context/clientMasterApi';
import {
  onClientMasterSubmit,
  onClientMasterSubmitError,
  onClientMasterSubmitSuccess,
  onPostClientMasterSubmitSuccess,
  onPostClientMasterSubmitError,
  onPostClientMasterSubmit
} from '../Store/Slices/clientMasterSlice';

function* ClientMaster() {
  try {
      const clientMasterResponse = yield call(getClientMasterApi);
    if (clientMasterResponse.status === 5) {
          yield put(onClientMasterSubmitSuccess({ data: clientMasterResponse.result.data, message: clientMasterResponse.result.message}));
    } else {
          yield put(onClientMasterSubmitError({ data: clientMasterResponse.result.data, message: clientMasterResponse.result.message,  }));
    }
  } catch (error) {
      const message = error.response || 'Something went wrong';
    yield put(onClientMasterSubmitError({ data: {}, message, status_code: 400 }));
  }
}
function* postClientMaster(payload) {
    console.log(payload,"payload")
    try {
        const postClientMasterResponse = yield call(postClientMasterApi,payload.payload);
      if (postClientMasterResponse.status === 5) {
            yield put(onPostClientMasterSubmitSuccess({ data: postClientMasterResponse.result.data, message: postClientMasterResponse.result.message}));
      } else {
            yield put(onPostClientMasterSubmitError({ data: postClientMasterResponse.result.data, message: postClientMasterResponse.result.message,  }));
      }
    } catch (error) {
        const message = error.response || 'Something went wrong';
      yield put(onClientMasterSubmitError({ data: {}, message, status_code: 400 }));
    }
  }
  

export default function* clientMasterSaga() {
  yield takeLatest(onClientMasterSubmit.type, ClientMaster);
  yield takeLatest(onPostClientMasterSubmit.type, postClientMaster);

}
