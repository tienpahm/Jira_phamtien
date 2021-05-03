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
import {LOGIN_SAGA} from "../../constant/BugtifyConstant";
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
    notifiFuncion("error", "Uncorrect email or password", "Please try again");
    console.log(err.response.message);
  }
}
export function* monitorLoginSaga() {
  yield takeLatest(LOGIN_SAGA, loginSaga);
}
