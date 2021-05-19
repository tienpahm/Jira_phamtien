import React from "react";
import "./SideNav.css";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {MODAL_CREATE} from "../redux/constant/BugtifyConstant";
import CreateTaskModal from "./TaskModal/CreateTaskModal";
import {message} from "antd";
import {history} from "../util/history/history";

export default function SideNav() {
  const dispatch = useDispatch();
  const {triggerCreateTask} = useSelector((state) => state.TaskReducer);
  return (
    <div className="col-2 sideNav">
      <div className="sideNav_buttons">
        <div className="sideNav_button">
          <button
            data-toggle="modal"
            data-target={triggerCreateTask ? "#exampleModalLong" : ""}
            onClick={() => {
              triggerCreateTask
                ? dispatch({
                    type: MODAL_CREATE,
                    createModal: CreateTaskModal,
                  })
                : message.error("Please Choose Project First");
            }}>
            <i className="fa fa-plus"></i>
          </button>
          <div className="tooltip">Create Task</div>
        </div>
        <div className="sideNav_button">
          <button
            onClick={() => {
              history.push("/usersetting");
            }}>
            <i className="fa fa-user-cog"></i>
          </button>
          <div className="tooltip">Account Setting</div>
        </div>
        <div className="sideNav_button">
          <button
            onClick={() => {
              history.push("/usermanagement");
            }}>
            <i className="fa fa-user-friends"></i>
          </button>
          <div className="tooltip">Users </div>
        </div>
      </div>
    </div>
  );
}
