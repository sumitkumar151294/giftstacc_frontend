import { call, put, takeLatest } from 'redux-saga/effects';
import { onLoginSubmit , onLoginSubmitError , onLoginSubmitSuccess} from "../../Store/Slices/loginSlice"
import { callLoginApi } from '../../Context/loginApi';

function* Login({ payload }) {
    debugger
  try {
    const loginResponse = yield call(callLoginApi, payload);
    if (loginResponse.status_code === 200) {
      yield put(onLoginSubmitSuccess({ data: loginResponse, message: loginResponse.message }));
    } else {
      yield put(onLoginSubmitError({ data: loginResponse.data, message: loginResponse.message, }));
    }
  } catch (error) {
    const message = error.response || 'Something went wrong';
    yield put(onLoginSubmitError({ data: {}, message, status_code: 400 }));
  }
}
export default function* loginSaga() {
  yield takeLatest(onLoginSubmit.type, Login);
}