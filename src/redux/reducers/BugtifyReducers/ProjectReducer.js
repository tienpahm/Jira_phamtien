import {FUNCTION_SUBMIT, GET_ALL_PROJECT} from "../../constant/BugtifyConstant";

const initialState = {
  arrProject: [],
  functionSubmit: () => {
    alert(123);
  },
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT: {
      return {...state, arrProject: action.arrProject};
    }
    case FUNCTION_SUBMIT: {
      console.log(123);
      return {...state, functionSubmit: action.functionSubmit};
    }

    default:
      return {...state};
  }
};
