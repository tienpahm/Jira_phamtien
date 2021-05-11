import {
  EDIT_PROJECT,
  FUNCTION_SUBMIT,
  GET_ALL_PROJECT,
} from "../../constant/BugtifyConstant";

const initialState = {
  arrProject: [],
  functionSubmit: () => {
    alert(123);
  },
  editProject: undefined,
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

    default:
      return {...state};
  }
};
