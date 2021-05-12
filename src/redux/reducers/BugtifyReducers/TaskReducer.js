import {GET_STATUS_LIST} from "../../constant/BugtifyConstant";

const initialState = {
  arrStatus: [],
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS_LIST: {
      return {...state, arrStatus: action.arrStatus};
    }
    default:
      return state;
  }
};
