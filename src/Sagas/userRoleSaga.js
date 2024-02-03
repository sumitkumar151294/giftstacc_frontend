import { call, put, takeLatest } from "redux-saga/effects";
import { onGetUserRole, onGetUserRoleError, onGetUserRoleSuccess, onPostUserRole, onPostUserRoleError, onPostUserRoleSuccess, onUpdateUserRole, onUpdateUserRoleError, onUpdateUserRoleSuccess } from "../Store/Slices/userRoleSlice";
import { callUserRoleGetApi, callUserRolePostApi, callUserRoleUpdateApi } from "../Context/userRoleApi";

function* GetUserRole() {
  try {
    const getUserRoleResponse = yield call(callUserRoleGetApi);
    if (getUserRoleResponse.httpStatusCode === 200) {

      yield put(
        onGetUserRoleSuccess({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.errorMessage,

        })
      );
    } else {
      yield put(
        onGetUserRoleError({
          data: getUserRoleResponse.response,

          message: getUserRoleResponse.response.message,

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

    if (postUserRoleResponse.httpStatusCode === 200) {

      yield put(
        onPostUserRoleSuccess({
          data: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onPostUserRoleError({
          data: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostUserRoleError({ data: {}, message, status_code: 400 }));
  }
}
function* UpdateUserRole({ payload }) {
  try {
    const updateUserRoleResponse = yield call(callUserRoleUpdateApi, payload);
    if (updateUserRoleResponse.status === 200) {
      yield put(
        onUpdateUserRoleSuccess({
          data: updateUserRoleResponse.result,
          message: updateUserRoleResponse.result.message,
        })
      );
    } else {
      yield put(
        onUpdateUserRoleError({
          data: updateUserRoleResponse.result,
          message: updateUserRoleResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateUserRoleError({ data: {}, message, status_code: 400 }));
  }
}
export default function* userRoleSaga() {
  yield takeLatest(onGetUserRole.type, GetUserRole);
  yield takeLatest(onPostUserRole.type, PostUserRole);
  yield takeLatest(onUpdateUserRole.type, UpdateUserRole);
}
