import {all, call} from "@redux-saga/core/effects";
import * as LoginSaga from "./BugitfySagas/LoginSaga";
import * as ProjectSaga from "./BugitfySagas/ProjectSaga";
import * as UserSaga from "./BugitfySagas/UserSaga";
import * as CategorySaga from "./BugitfySagas/CategorySaga";
import * as TaskSaga from "./BugitfySagas/TaskSaga";

export function* rootSaga() {
  yield all([
    //Monitor login
    LoginSaga.monitorLoginSaga(),
    //Monitor Project
    ProjectSaga.monitorGetAllProjectsSaga(),
    ProjectSaga.monitorAssignUserProjectSaga(),
    ProjectSaga.monitorDeleteProjectSaga(),
    ProjectSaga.monitorCreateProjectSaga(),
    ProjectSaga.monitorRemoveUserProjectSaga(),
    ProjectSaga.monitorUpdateProjectSaga(),
    ProjectSaga.monitorGetProjectDetailSaga(),
    //Monitor user
    UserSaga.monitorGetAllUserSaga(),
    //Monitor get category
    CategorySaga.monitorGetCategorySaga(),
    //Monitor Task
    TaskSaga.monitorGetStatusList(),
  ]);
}
