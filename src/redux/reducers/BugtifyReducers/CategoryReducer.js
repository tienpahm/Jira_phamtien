import {GET_CATEGROY} from "../../constant/BugtifyConstant";

const initialState = {
  arrCategory: [],
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGROY: {
      return {...state, arrCategory: action.arrCategory};
    }

    default:
      return {...state};
  }
};
