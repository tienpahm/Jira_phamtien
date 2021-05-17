import {call, takeLatest, delay, select, put} from "redux-saga/effects";
import {message} from "antd";
import {taskService} from "../../../services/TaskServices";
import {STATUS_CODE} from "../../../util/constant/system";
import {
  CREATE_TASK_SAGA,
  DISPLAY_LOADING,
  GET_PRIORITY_LIST,
  GET_PRIORITY_LIST_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_STATUS_LIST,
  GET_STATUS_LIST_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  GET_TASK_TYPE,
  GET_TASK_TYPE_SAGA,
  HIDE_LOADING,
  REMOVE_TASK_SAGA,
  UPDATE_TASK_SAGA,
  DELETE_USER_TASK_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
} from "../../constant/BugtifyConstant";
import {notifiFuncion} from "../../../util/notification/notification";

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
//------------------------------------------------------------
function* getTaskTypeList() {
  try {
    const {data, status} = yield call(() => {
      return taskService.getTaskTypeList();
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_TYPE,
        arrTaskType: data.content,
      });
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}
export function* monitorGetTaskTypeList() {
  yield takeLatest(GET_TASK_TYPE_SAGA, getTaskTypeList);
}
//------------------------------------------------------------
function* getPriorityList() {
  try {
    const {data, status} = yield call(() => {
      return taskService.getPriorityList();
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PRIORITY_LIST,
        arrPriority: data.content,
      });
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}
export function* monitorGetPriority() {
  yield takeLatest(GET_PRIORITY_LIST_SAGA, getPriorityList);
}
//------------------------------------------------------------
function* createTaskSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(300);
    const {data, status} = yield call(() => {
      return taskService.createTask(action.project);
    });
    console.log("tao task", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        id: action.projectId,
      });
    }

    notifiFuncion("success", "Successfully Create Task ");
  } catch (err) {
    notifiFuncion("error", `${err.response.data.content}`);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* monitorCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
//------------------------------------------------------------
function* removeTaskSaga(action) {
  console.log(action.taskId);
  try {
    const {data, status} = yield call(() => {
      return taskService.removeTask(action.taskId);
    });
    console.log("removetask", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        id: action.projectId,
      });
    }
    message.error(`SuccessFully Remove Task`);
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}
export function* monitorRemoveTaskSaga() {
  yield takeLatest(REMOVE_TASK_SAGA, removeTaskSaga);
}
//------------------------------------------------------------
function* getTaskDetailSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });

    const {data, status} = yield call(() => {
      return taskService.getTaskDetail(action.taskId);
    });
    console.log("task", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        targetTask: data.content,
      });
    }

    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}
export function* monitorGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}
//------------------------------------------------------------
function* updateTaskDetailSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.updateTask(action.taskUpdate);
    });
    console.log("update", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskUpdate.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        id: action.taskUpdate.projectId,
      });
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
    console.log(err.response.data.content);
  }
}
export function* monitorUpdateTaskDetailSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskDetailSaga);
}
//------------------------------------------------------------
function* removeUserFromTaskSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.removeUserFromTask(action.taskRemove);
    });
    console.log("remove", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskUpdate.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        id: action.taskUpdate.projectId,
      });
    }
  } catch (err) {}
}
export function* monitorRemoveUserFromTaskSaga() {
  yield takeLatest(DELETE_USER_TASK_SAGA, removeUserFromTaskSaga);
}

//----------Comment Part--------------------------------------------------
function* getAllCommentSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.getAllCommnetTask(action.taskId);
    });
    console.log("comment", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT,
        listComment: data.content,
      });
    }
  } catch (err) {}
}
export function* monitorGetAllComment() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}
//------------------------------------------------------------
function* insertCommentSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.insertCommentTask(action.comment);
    });
    console.log("insert", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: action.comment.taskId,
      });
    }
  } catch (err) {}
}
export function* monitorInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}
//------------------------------------------------------------
function* deleteCommentSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.deletComment(action.comment.commentId);
    });
    console.log("delete", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: action.comment.taskId,
      });
    }
  } catch (err) {}
}
export function* monitorDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
