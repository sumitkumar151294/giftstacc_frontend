import { call, put, takeLatest } from "redux-saga/effects";
import { callModuleApi } from "../Context/moduleApi";
import { onGetModule, onGetModuleError, onGetModuleSuccess } from "../Store/Slices/moduleSlice";

function* Module() {
  try {
    const moduleResponse = yield call(callModuleApi);
    if (moduleResponse.status === 5) {
      yield put(
        onGetModuleSuccess({
          data: moduleResponse.result,
          message: moduleResponse.result.message,
        })
      );
    } else {
      yield put(
        onGetModuleError({
          data: moduleResponse.result,
          message: moduleResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetModuleError({ data: {}, message, status_code: 400 }));
  }
}
export default function* moduleSaga() {
  yield takeLatest(onGetModule.type, Module);
}
