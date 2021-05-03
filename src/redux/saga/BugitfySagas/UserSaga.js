import {call, takeLatest, delay, select, put} from "redux-saga/effects";
import {useService} from "../../../services/UserService";
import {STATUS_CODE} from "../../../util/constant/system";
import {GET_ALL_USER, GET_ALL_USER_SAGA} from "../../constant/BugtifyConstant";

function* getAllUserSaga() {
  try {
    const {data, status} = yield call(() => {
      return useService.getAllUser();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* monitorGetAllUserSaga() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga);
}
