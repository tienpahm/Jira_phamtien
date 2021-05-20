import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  LOGIN_SAGA,
} from "../../constant/BugtifyConstant";
import Axios from "axios";
import {
  DOMAIN_BUGTIFY,
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constant/system";
import {history} from "../../../util/history/history";
import {notifiFuncion} from "../../../util/notification/notification";

function* loginSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const {data, status} = yield Axios({
      url: `${DOMAIN_BUGTIFY}/Users/signin`,
      method: "POST",
      data: action.data,
    });
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    }

    if (localStorage.getItem(TOKEN)) {
      history.push("./projectmanagement");
    }
  } catch (err) {
    yield put({
      type: HIDE_LOADING,
    });
    notifiFuncion("error", "Uncorrect email or password", "Please try again");
  }
}
export function* monitorLoginSaga() {
  yield takeLatest(LOGIN_SAGA, loginSaga);
}
