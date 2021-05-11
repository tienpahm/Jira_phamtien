import EditProjectModal from "../../../Component/EditProjectModal";
import {MODAL_CREATE, MODAL_EDIT} from "../../constant/BugtifyConstant";

const initialState = {
  ModalComponent: "",
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_EDIT: {
      return {...state, ModalComponent: action.editModal};
    }
    case MODAL_CREATE: {
      return {...state, ModalComponent: action.createModal};
    }
    default:
      return {...state};
  }
};
