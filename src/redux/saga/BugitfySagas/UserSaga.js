import {message} from "antd";
import {call, takeLatest, delay, select, put} from "redux-saga/effects";
import {useService} from "../../../services/UserService";
import {STATUS_CODE} from "../../../util/constant/system";
import {history} from "../../../util/history/history";
import {
  CURRENT_USER,
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  SIGN_UP_USER_SAGA,
} from "../../constant/BugtifyConstant";

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
//=====================================================
function* signUpUserSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return useService.signUpuser(action.user);
    });
    console.log("user", data);
    if (status === STATUS_CODE.SUCCESS) {
      message.success("Successfully Sign Up");
      yield delay(300);
      history.push("/");
    }
  } catch (err) {
    message.error("Email Already Use");
  }
}

export function* monitorSignUpUserSaga() {
  yield takeLatest(SIGN_UP_USER_SAGA, signUpUserSaga);
}
//=====================================================
function* editUserSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return useService.editUser(action.user);
    });

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Successfully Edit user");
      if (action.flag) {
        localStorage.setItem("USER_LOGIN", JSON.stringify(action.user));
        yield put({
          type: CURRENT_USER,
          currentUser: action.user,
        });
        yield put({
          type: GET_ALL_USER_SAGA,
        });
      } else {
        yield put({
          type: GET_ALL_USER_SAGA,
        });
      }
    }
  } catch (err) {}
}

export function* monitorEditUserSaga() {
  yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}
//=====================================================
function* deleteUserSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return useService.deleteUser(action.userId);
    });

    if (status === STATUS_CODE.SUCCESS) {
      message.success("Successfully Delete user");
      yield put({
        type: GET_ALL_USER_SAGA,
      });
    }
  } catch (err) {
    message.error("Fail Delete user");
  }
}

export function* monitorDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
