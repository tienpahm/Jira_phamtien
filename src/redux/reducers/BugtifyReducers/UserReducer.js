import {
  CURRENT_USER,
  EDIT_USER_MANAGEMENT,
  GET_ALL_USER,
} from "../../constant/BugtifyConstant";

const initialState = {
  arrUser: [],
  currentUser: undefined,
  targetUser: undefined,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {...state, arrUser: action.arrUser};
    case CURRENT_USER:
      return {...state, currentUser: action.currentUser};
    case EDIT_USER_MANAGEMENT: {
      return {...state, targetUser: action.targetUser};
    }
    default:
      return {...state};
  }
};
