import { call, put, takeLatest } from "redux-saga/effects";
import { clientProductMappingGetApi, } from "../Context/clientProductMappingApi";
import { onClientProductMappingSubmit,onClientProductMappingSubmitSuccess,onClientProductMappingSubmitError,onPostClientProductMappingSubmit,onPostClientProductMappingSubmitSuccess,onPostClientProductMappingSubmitError,onUpdateClientProductMappingSubmit,onUpdateClientProductMappingSubmitSuccess,onUpdateClientProductMappingSubmitError } from "../Store/Slices/clientProductMappingSlice";
function* clientProductMapping() {
  try {
    const clientProductMappingResponse = yield call(clientProductMappingGetApi);
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

export default function* clientMappingSaga() {
  yield takeLatest(onClientProductMappingSubmit.type,  clientProductMapping);
  
}
