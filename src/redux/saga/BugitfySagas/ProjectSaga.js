import {call, takeLatest, delay, select, put} from "redux-saga/effects";
import {projectService} from "../../../services/ProjectService";
import {STATUS_CODE} from "../../../util/constant/system";

import {
  ASSIGN_USER_PROJECT_SAGA,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  DELETE_USER_PROJECT,
  DISPLAY_LOADING,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  HIDE_LOADING,
  UPDATE_PROJECT_SAGA,
} from "../../constant/BugtifyConstant";
import {message} from "antd";
import {taskService} from "../../../services/TaskServices";

//fetch project list
function* getAllProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.getAllProject();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });
    }
  } catch (err) {}
}

export function* monitorGetAllProjectsSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

//assign user for project and reload

function* assignUserProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.assignUserProject(action.assignUser);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });

      message.success("Successfully Assign User for Project");
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}

export function* monitorAssignUserProjectSaga() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

//delete Project and reload
function* deleteProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.deleteProject(action.projectId);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });

      message.success("Successfully Delete Project");
    }
  } catch (err) {
    // notifiFuncion("error", "Fail to Delete Project ");
    message.error(`${err.response.data.content}`);
  }
}

export function* monitorDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//Create Projet
function* createProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.createProject(action.project);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });

      message.success("Successfully Create Project");
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}

export function* monitorCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* removeUserProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.deleteUserProject(action.project);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });

      message.success("Successfully Remove User Project");
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}

export function* monitorRemoveUserProjectSaga() {
  yield takeLatest(DELETE_USER_PROJECT, removeUserProjectSaga);
}

function* updateProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.updateProject(action.project);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });

      message.success("Successfully Update User Project");
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}

export function* monitorUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* getProjectDetail(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.getProjectDetail(action.id);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        targetProject: data.content,
      });
    }
  } catch (err) {
    message.error(`${err.response.data.content}`);
  }
}

export function* monitorGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}
