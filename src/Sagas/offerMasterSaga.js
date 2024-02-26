import { call, put, takeLatest } from "redux-saga/effects";
import { callOfferMasterPostApi,callOfferMasterGetApi } from "../Context/offerMasterApi";
import { onPostOfferMasterSubmit,
  onPostOfferMasterSuccess,
  onPostOfferMasterError,
  onGetOfferMaster,
  onGetOfferMasterSuccess,
  onGetOfferMasterError } from "../Store/Slices/offerMasterSlice";

function* PostOfferMaster({payload}) {
    try{
      const postOfferMasterResponse = yield call(callOfferMasterPostApi,payload);
    if (postOfferMasterResponse.httpStatusCode === "201") {
      yield put( 
        onPostOfferMasterSuccess({       
          data:postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
          httpStatusCode: postOfferMasterResponse.httpStatusCode,
       })
      );
    } else {
      yield put(
        onPostOfferMasterError({
          data: postOfferMasterResponse.response,
          message: postOfferMasterResponse.errorMessage,
        })
      );
    }
    }
    catch (error) {
      const message = error.response || "Something went wrong";
      yield put(onPostOfferMasterError({ data: {}, message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
    }
}
function* GetOfferMaster() { try {
    const getOfferMasterResponse = yield call(callOfferMasterGetApi);
    console.log("getOfferMasterResponse", getOfferMasterResponse);
    if (getOfferMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetOfferMasterSuccess({
          getData: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetOfferMasterError({
          getData: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetOfferMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* offerMasterSaga() {
  yield takeLatest(onPostOfferMasterSubmit.type, PostOfferMaster);
  yield takeLatest(onGetOfferMaster.type, GetOfferMaster);
}
