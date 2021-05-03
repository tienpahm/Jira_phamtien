import {DISPLAY_LOADING, HIDE_LOADING} from "../../constant/BugtifyConstant";

const initialState = {
  isVisibleLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return {...state, isVisibleLoading: true};
    }

    case HIDE_LOADING: {
      return {...state, isVisibleLoading: false};
    }

    default:
      return {...state};
  }
};
