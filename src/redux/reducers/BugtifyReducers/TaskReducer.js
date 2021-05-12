import {
  GET_PRIORITY_LIST,
  GET_STATUS_LIST,
  GET_TASK_TYPE,
} from "../../constant/BugtifyConstant";

const initialState = {
  arrStatus: [],
  arrTaskType: [],
  arrPriority: [],
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS_LIST: {
      return {...state, arrStatus: action.arrStatus};
    }
    case GET_TASK_TYPE: {
      return {...state, arrTaskType: action.arrTaskType};
    }
    case GET_PRIORITY_LIST: {
      return {...state, arrPriority: action.arrPriority};
    }
    default:
      return state;
  }
};
