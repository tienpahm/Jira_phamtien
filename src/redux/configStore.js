import {applyMiddleware, combineReducers, createStore} from "redux";
import {LoginReducer} from "./reducers/BugtifyReducers/LoginReducer";
import {ProjectReducer} from "./reducers/BugtifyReducers/ProjectReducer";
import {LoadingReducer} from "./reducers/BugtifyReducers/LoadingReducer";
import {UserReducer} from "./reducers/BugtifyReducers/UserReducer";
import {ModalReducer} from "./reducers/BugtifyReducers/ModalReducer";
import {CategoryReducer} from "./reducers/BugtifyReducers/CategoryReducer";
import {TaskReducer} from "./reducers/BugtifyReducers/TaskReducer";
//middleware saga
import createMiddleWareSaga from "redux-saga";
import {rootSaga} from "./saga/rootSaga";

const middleWareSage = createMiddleWareSaga();

const rootReducer = combineReducers({
  //Reducer util
  LoginReducer,
  LoadingReducer,
  ModalReducer,

  CategoryReducer,

  ProjectReducer,

  UserReducer,

  TaskReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSage));

middleWareSage.run(rootSaga);

export default store;
