import React from "react";
import "./SideNav.css";
import {useDispatch} from "react-redux";
import {MODAL_CREATE} from "../redux/constant/BugtifyConstant";
import CreateTaskModal from "./TaskModal/CreateTaskModal";

export default function SideNav() {
  const dispatch = useDispatch();
  return (
    <div className="col-2 sideNav">
      <div className="sideNav_button">
        <button
          data-toggle="modal"
          data-target="#exampleModalLong"
          onClick={() => {
            dispatch({
              type: MODAL_CREATE,
              createModal: CreateTaskModal,
            });
          }}>
          <i className="fa fa-plus"></i>
        </button>
        <div className="sideNav_tooltip">Create Task</div>
      </div>
    </div>
  );
}
