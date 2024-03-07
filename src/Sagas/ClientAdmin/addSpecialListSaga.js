import { call, put, takeLatest } from "redux-saga/effects";
import { onAddSpecialSubmit, onAddSpecialSubmitSuccess, onAddSpecialSubmitError, onGetAddSpecial, onGetAddSpecialSuccess, onGetAddSpecialError, onAddSpecialUpdate, onAddSpecialUpdateSuccess, onAddSpecialUpdateError
} from "../../Store/Slices/ClientAdmin/addSpecialListSlice";
import { callAddSpecialListGetApi, callAddSpecialListPostApi, callAddSpecialListUpdateApi } from "../../Context/ClientAdmin/addSpecialListApi";

function* OnAddSpecialSubmit({ payload }) {
  try {
    const addSpecialResponse = yield call(callAddSpecialListPostApi, payload);
    if (addSpecialResponse.httpStatusCode === "201") {
      yield put(
        onAddSpecialSubmitSuccess({
          data: addSpecialResponse.response,
          message: addSpecialResponse.errorMessage,
          status_code: addSpecialResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onAddSpecialSubmitError({
          data: addSpecialResponse.response,
          message: addSpecialResponse.errorMessage,
          status_code: addSpecialResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onAddSpecialSubmitError({ data: {}, message, status_code: 400 }));
  }
}
function* OnGetAddSpecial() {
  try {
    const addSpecialResponse = yield call(callAddSpecialListGetApi);
    if (addSpecialResponse.httpStatusCode === "200") {
      yield put(
        onGetAddSpecialSuccess({
          data: addSpecialResponse.response,
          message: addSpecialResponse.errorMessage,
          status_Code:addSpecialResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetAddSpecialError({
          data: addSpecialResponse.response,
          message: addSpecialResponse.errorMessage,
          status_Code:addSpecialResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetAddSpecialError({ data: {}, message, status_code: 400 }));
  }
}
function* OnAddSpecialUpdate({ payload }) {
  try {
    const updateAddSpecialResponse = yield call(callAddSpecialListUpdateApi, payload);
    if (updateAddSpecialResponse.httpStatusCode === "201") {
      yield put(
        onAddSpecialUpdateSuccess({
          data: updateAddSpecialResponse.response,
          message: updateAddSpecialResponse.errorMessage,
          status_code:updateAddSpecialResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onAddSpecialUpdateError({
          data: updateAddSpecialResponse.response,
          message: updateAddSpecialResponse.errorMessage,
          status_code:updateAddSpecialResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onAddSpecialUpdateError({ data: {}, message, status_code: 400 }));
  }
}
export default function* addSpecialListSaga() {
  yield takeLatest(onAddSpecialSubmit.type, OnAddSpecialSubmit);
  yield takeLatest(onGetAddSpecial.type, OnGetAddSpecial);
  yield takeLatest(onAddSpecialUpdate.type, OnAddSpecialUpdate);
}
