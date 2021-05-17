import {
  EDIT_PROJECT,
  FUNCTION_SUBMIT,
  GET_ALL_PROJECT,
  GET_PROJECT_DETAIL,
  UPDATE_ASIGNESS_LIST,
} from "../../constant/BugtifyConstant";

const initialState = {
  arrProject: [],
  functionSubmit: () => {
    alert(123);
  },
  editProject: undefined,
  targetProject: undefined,
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      return {...state, arrProject: action.arrProject};
    }
    case FUNCTION_SUBMIT: {
      return {...state, functionSubmit: action.functionSubmit};
    }
    case EDIT_PROJECT: {
      return {...state, editProject: action.editProject};
    }
    case GET_PROJECT_DETAIL: {
      return {...state, targetProject: action.targetProject};
    }

    default:
      return {...state};
  }
};
