import { call, put, takeLatest } from "redux-saga/effects";
import {onbrandCatalogueSubmit,onbrandCatalogueSuccess,onbrandCatalogueError} from "../Store/Slices/brandCatalogueSlice";
import { getBrandCatalogue } from "../Context/brandCatalogueApi";

function* BrandCatalogue( ) {
  try {
    const brandCatalogueResponse = yield call(getBrandCatalogue);
    if (brandCatalogueResponse.code === 1) {
      yield put(
        onbrandCatalogueSuccess({
          data: brandCatalogueResponse.data,
          message: brandCatalogueResponse.message,
        })
      );
    } else {
      yield put(
        onbrandCatalogueError({
          data: brandCatalogueResponse.data,
          message: brandCatalogueResponse.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onbrandCatalogueError({ data: {}, message, status_code: 400 }));
  }
}
export default function* BrandCatalogueSaga() {
  yield takeLatest(onbrandCatalogueSubmit.type, BrandCatalogue);
}
