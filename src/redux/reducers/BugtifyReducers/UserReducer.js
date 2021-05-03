import {GET_ALL_USER} from "../../constant/BugtifyConstant";

const initialState = {
  arrUser: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {...state, arrUser: action.arrUser};

    default:
      return {...state};
  }
};
