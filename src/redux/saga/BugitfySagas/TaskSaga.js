import {call, takeLatest, delay, put} from "redux-saga/effects";
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
  UPDATE_COMMENT_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../constant/BugtifyConstant";
import {notifiFuncion} from "../../../util/notification/notification";
//-------------------status part -------------------
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

function* updateTaskStatusSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.updateStatus(action.updateTaskStatus);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        id: action.projectId,
      });
    }
  } catch (err) {}
}
export function* monitorUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
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
  try {
    const {data, status} = yield call(() => {
      return taskService.removeTask(action.taskId);
    });

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
    const {data, status} = yield call(() => {
      return taskService.getTaskDetail(action.taskId);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        targetTask: data.content,
      });
    }
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

//------------------------------------------------------------
function* updateCommentSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.updateComment(
        action.comment.commentId,
        action.comment.contentComment
      );
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: action.comment.taskId,
      });
    }
  } catch (err) {}
}
export function* monitorUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
