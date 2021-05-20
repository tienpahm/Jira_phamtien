import {
  call,
  takeLatest,
  delay,
  select,
  put,
  actionChannel,
} from "redux-saga/effects";
import {categoryServices} from "../../../services/CategoryServices";
import {GET_CATEGORY_SAGA, GET_CATEGROY} from "../../constant/BugtifyConstant";

function* getProjectCategory() {
  try {
    const {data, status} = yield call(() => {
      return categoryServices.getProjectCategory();
    });

    yield put({
      type: GET_CATEGROY,
      arrCategory: data.content,
    });
  } catch (err) {}
}
export function* monitorGetCategorySaga() {
  yield takeLatest(GET_CATEGORY_SAGA, getProjectCategory);
}
