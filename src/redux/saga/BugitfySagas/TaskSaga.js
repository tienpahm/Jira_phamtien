import {call, takeLatest, delay, select, put} from "redux-saga/effects";
import {message} from "antd";
import {taskService} from "../../../services/TaskServices";
import {STATUS_CODE} from "../../../util/constant/system";
import {
  GET_STATUS_LIST,
  GET_STATUS_LIST_SAGA,
} from "../../constant/BugtifyConstant";

function* getStatusList() {
  try {
    const {data, status} = yield call(() => {
      return taskService.getStatusList();
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_STATUS_LIST,
        arrStatus: data.content,
      });
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}
export function* monitorGetStatusList() {
  yield takeLatest(GET_STATUS_LIST_SAGA, getStatusList);
}
