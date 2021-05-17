import {
  GET_ALL_COMMENT,
  GET_PRIORITY_LIST,
  GET_STATUS_LIST,
  GET_TASK_DETAIL,
  GET_TASK_TYPE,
  REMOVE_USER_FROM_TASK,
  UPDATE_ASIGNESS_LIST,
} from "../../constant/BugtifyConstant";

const initialState = {
  arrStatus: [],
  arrTaskType: [],
  arrPriority: [],
  targetTask: undefined,
  listTaskComment: [],
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
    case GET_TASK_DETAIL: {
      return {...state, targetTask: action.targetTask};
    }
    case UPDATE_ASIGNESS_LIST: {
      return {...state, targetTask: action.targetProjectListUpdate};
    }
    case REMOVE_USER_FROM_TASK: {
      let updateAsignessList = state.targetTask.assigness.filter(
        (item) => item.id !== action.userId
      );

      return {
        ...state,
        targetTask: {...state.targetTask, assigness: updateAsignessList},
      };
    }
    case GET_ALL_COMMENT: {
      return {...state, listTaskComment: action.listComment};
    }

    default:
      return state;
  }
};
