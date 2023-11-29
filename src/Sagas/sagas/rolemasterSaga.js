
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from "../../Store/Slices/rolemasterSlice";
import { rolemasterApi } from "../../Context/rolemasterApi";

function* fetchDataSaga(action) {
  try {
    yield put(fetchDataStart());
    const data = yield call(rolemasterApi, action.payload);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* rolemasterSaga() {
  yield takeLatest('formData/fetchData', fetchDataSaga);
}
