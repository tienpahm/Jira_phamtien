import EditProjectModal from "../../../Component/EditProjectModal";
import {MODAL_CREATE, MODAL_EDIT} from "../../constant/BugtifyConstant";

const initialState = {
  modalComponent: <div></div>,
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_EDIT: {
      return {...state, modalComponent: action.editModal};
    }
    case MODAL_CREATE: {
      return {...state, modalComponent: action.createModal};
    }
    default:
      return {...state};
  }
};
