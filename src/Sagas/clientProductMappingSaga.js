import { call, put, takeLatest } from "redux-saga/effects";
import { clientProductMappingGetApi, clientProductMappingPostApi, clientProductMappingUpdateApi, } from "../Context/clientProductMappingApi";
import { onClientProductMappingSubmit,onClientProductMappingSubmitSuccess,onClientProductMappingSubmitError,onPostClientProductMappingSubmit,onPostClientProductMappingSubmitSuccess,onPostClientProductMappingSubmitError,onUpdateClientProductMappingSubmit,onUpdateClientProductMappingSubmitSuccess,onUpdateClientProductMappingSubmitError } from "../Store/Slices/clientProductMappingSlice";
function* clientProductMapping({payload}) {
  debugger
  try {
    const clientProductMappingResponse = yield call(clientProductMappingGetApi, payload);
    if (clientProductMappingResponse.httpStatusCode === "200") {
      yield put(
        onClientProductMappingSubmitSuccess({
          data: clientProductMappingResponse.response,
          message: clientProductMappingResponse.errorMessage,
          status_code: clientProductMappingResponse.httpStatusCode,

        })
      );
    } else {
      yield put(
        onClientProductMappingSubmitError({
          data: clientProductMappingResponse.response,
          message: clientProductMappingResponse.errorMessage,
          status_code: clientProductMappingResponse.httpStatusCode,

        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onClientProductMappingSubmitError({ data: {}, message, status_code: 400 }));
  }
}

function* updateClientProductMapping({payload}) {
  try {
    const clientProductMappingResponse = yield call(clientProductMappingUpdateApi, payload);
    if (clientProductMappingResponse.httpStatusCode === "201") {
      yield put(
        onUpdateClientProductMappingSubmitSuccess({
          data: clientProductMappingResponse.response,
          message: clientProductMappingResponse.errorMessage,
          status_code: clientProductMappingResponse.httpStatusCode,

        })
      );
    } else {
      yield put(
        onUpdateClientProductMappingSubmitError({
          data: clientProductMappingResponse.response,
          message: clientProductMappingResponse.errorMessage,
          status_code: clientProductMappingResponse.httpStatusCode,

        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateClientProductMappingSubmitError({ data: {}, message, status_code: 400 }));
  }
}

function* postClientProductMapping({payload}) {
  try {
    const clientProductMappingResponse = yield call(clientProductMappingPostApi, payload);
    if (clientProductMappingResponse.httpStatusCode === "201") {
      yield put(
        onPostClientProductMappingSubmitSuccess({
          data: clientProductMappingResponse.response,
          message: clientProductMappingResponse.errorMessage,
          status_code: clientProductMappingResponse.httpStatusCode,

        })
      );
    } else {
      yield put(
        onPostClientProductMappingSubmitError({
          data: clientProductMappingResponse.response,
          message: clientProductMappingResponse.errorMessage,
          status_code: clientProductMappingResponse.httpStatusCode,

        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostClientProductMappingSubmitError({ data: {}, message, status_code: 400 }));
  }
}

export default function* clientMappingSaga() {
  yield takeLatest(onClientProductMappingSubmit.type,  clientProductMapping);
  yield takeLatest(onPostClientProductMappingSubmit.type,  postClientProductMapping);
  yield takeLatest(onUpdateClientProductMappingSubmit.type,  updateClientProductMapping);
  
}
