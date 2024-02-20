import { call, put, takeLatest } from "redux-saga/effects";
import {onbrandCatalogueSubmit,onbrandCatalogueSuccess,onbrandCatalogueError} from "../Store/Slices/brandCatalogueSlice";
import { getBrandCatalogue } from "../Context/brandCatalogueApi";

function* BrandCatalogue( ) {
  try {
    const brandCatalogueResponse = yield call(getBrandCatalogue);
    if (brandCatalogueResponse) {
          yield put(
        onbrandCatalogueSuccess({
          data: brandCatalogueResponse.response,
          message: brandCatalogueResponse.errorMessage,
          status_code: brandCatalogueResponse.httpStatusCode

        })
      );
    } else {
      yield put(
        onbrandCatalogueError({
          data: brandCatalogueResponse.response,
          message: brandCatalogueResponse.errorMessage,
          status_code: brandCatalogueResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onbrandCatalogueError({ data: {}, message,  status_code: error.response.data.HttpStatusCode  }));
  }
}
export default function* BrandCatalogueSaga() {
  yield takeLatest(onbrandCatalogueSubmit.type, BrandCatalogue);
}
