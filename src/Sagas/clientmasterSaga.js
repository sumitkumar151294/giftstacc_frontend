// import { call, put, takeLatest } from 'redux-saga/effects';
// import { callClientMasterApi} from '../../../services/Admin/clientMasterApi';
// import {
//   onClientMasterSubmit,
//   onClientMasterSubmitError,
//   onClientMasterSubmitSuccess,
// } from '../Store/Slices/clientMasterSlice';

// function* ClientMaster({payload}) {
//   try {
//       const clientMasterResponse = yield call(callClientMasterApi, payload);
//     if (clientMasterResponse.status_code === 200) {
//           yield put(onClientMasterSubmitSuccess({ data: clientMasterResponse, message: clientMasterResponse.message}));
//     } else {
//           yield put(onClientMasterSubmitError({ data: clientMasterResponse.data, message: clientMasterResponse.message,  }));
//     }
//   } catch (error) {
//       const message = error.response || 'Something went wrong';
//     yield put(onClientMasterSubmitError({ data: {}, message, status_code: 400 }));
//   }
// }

// export default function* clientMasterSaga() {
//   yield takeLatest(onClientMasterSubmit.type, ClientMaster);
// }
