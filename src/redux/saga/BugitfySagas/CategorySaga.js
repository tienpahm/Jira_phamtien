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
  console.log(123);
  try {
    const {data, status} = yield call(() => {
      return categoryServices.getProjectCategory();
    });
    console.log(data);
    yield put({
      type: GET_CATEGROY,
      arrCategory: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* monitorGetCategorySaga() {
  yield takeLatest(GET_CATEGORY_SAGA, getProjectCategory);
}
