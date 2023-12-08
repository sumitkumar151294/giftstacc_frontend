import { call, put, takeLatest } from "redux-saga/effects";
import { onGetUserRole, onGetUserRoleError, onGetUserRoleSuccess, onPostUserRole, onPostUserRoleError, onPostUserRoleSuccess } from "../Store/Slices/userRoleSlice";
import { callUserRoleGetApi, callUserRolePostApi } from "../Context/userRoleApi";

function* GetUserRole() {
  try {
    const getUserRoleResponse = yield call(callUserRoleGetApi);
    if (getUserRoleResponse.status === 5) {
      yield put(
        onGetUserRoleSuccess({
          data: getUserRoleResponse.result,
          message: getUserRoleResponse.result.message,
        })
      );
    } else {
      yield put(
        onGetUserRoleError({
          data: getUserRoleResponse.result,
          message: getUserRoleResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetUserRoleError({ data: {}, message, status_code: 400 }));
  }
}
function* PostUserRole({ payload }) {
  try {
    const postUserRoleResponse = yield call(callUserRolePostApi, payload);
    if (postUserRoleResponse.status === 5) {
      yield put(
        onPostUserRoleSuccess({
          data: postUserRoleResponse.result,
          message: postUserRoleResponse.result.message,
        })
      );
    } else {
      yield put(
        onPostUserRoleError({
          data: postUserRoleResponse.result,
          message: postUserRoleResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostUserRoleError({ data: {}, message, status_code: 400 }));
  }
}
export default function* userRoleSaga() {
  yield takeLatest(onGetUserRole.type, GetUserRole);
  yield takeLatest(onPostUserRole.type, PostUserRole);
}
