import { call, put, takeLatest } from "redux-saga/effects";
import { callOfferMasterPostApi,callOfferMasterGetApi,callOfferMasterUpdateApi } from "../Context/offerMasterApi";
import { onPostOfferMasterSubmit,
  onPostOfferMasterSuccess,
  onPostOfferMasterError,
  onGetOfferMaster,
  onGetOfferMasterSuccess,
  onGetOfferMasterError,
  onUpdateOfferMaster,
  onUpdateOfferMasterSuccess,
  onUpdateOfferMasterError,
  } from "../Store/Slices/offerMasterSlice";

function* PostOfferMaster({payload}) {
    try{
      const postOfferMasterResponse = yield call(callOfferMasterPostApi,payload);
    if (postOfferMasterResponse.httpStatusCode === "201") {
      yield put( 
        onPostOfferMasterSuccess({       
          postData:postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          status_code: postOfferMasterResponse.httpStatusCode,
       })
      );
    } else {
      yield put(
        onPostOfferMasterError({
          postData: postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          status_code: postOfferMasterResponse.httpStatusCode,
        })
      );
    }
    }
    catch (error) {
      const message = error.response || "Something went wrong";
      yield put(onPostOfferMasterError({ postData: {}, message, status_code: 400}));
    }
}

function* GetOfferMaster() { 
  try {
    const getOfferMasterResponse = yield call(callOfferMasterGetApi);
    if (getOfferMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetOfferMasterSuccess({
          getData: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
          status_code: getOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetOfferMasterError({
          getData: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
          status_code: getOfferMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetOfferMasterError({ getData: {}, message, status_code: 400 }));
  }
}

  function* PutOfferMaster({payload}) {
    try {
    const updateOfferMasterResponse = yield call(callOfferMasterUpdateApi,payload);
    if (updateOfferMasterResponse.httpStatusCode === "200") {
      yield put(
        onUpdateOfferMasterSuccess({
          updateData: updateOfferMasterResponse.response,
          message: updateOfferMasterResponse.errorMessage,
          status_code: updateOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdateOfferMasterError({
          updateData: updateOfferMasterResponse.response,
          message: updateOfferMasterResponse.errorMessage,
          status_code: updateOfferMasterResponse.httpStatusCode,
        })
      );
    }
    } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateOfferMasterError({ data: {}, message, status_code: 400 }));
    }
  }


export default function* offerMasterSaga() {
  yield takeLatest(onPostOfferMasterSubmit.type, PostOfferMaster);
  yield takeLatest(onGetOfferMaster.type, GetOfferMaster);
  yield takeLatest(onUpdateOfferMaster.type, PutOfferMaster);
}
