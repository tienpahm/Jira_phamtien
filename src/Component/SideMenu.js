import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {CURRENT_USER, MODAL_CREATE} from "../redux/constant/BugtifyConstant";
import CreateProjectModal from "./CreateProjectModal";
import {Tooltip, Button} from "antd";

import "./SideMenu.css";
import {TOKEN} from "../util/constant/system";

export default function SideMenu() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: CURRENT_USER,
      currentUser: JSON.parse(localStorage.getItem("USER_LOGIN")),
    });
  }, []);
  const {currentUser} = useSelector((state) => state.UserReducer);

  return (
    <div className="col-10 sideMenu">
      {" "}
      <div className="text-right w-100">
        <div className="btn-signOut">
          <Link
            to="/"
            onClick={() => {
              localStorage.setItem(TOKEN, "");
            }}>
            {" "}
            <i className="fa fa-sign-out-alt"></i>
          </Link>
          <div className="tooltip">Sign Out</div>
        </div>
      </div>
      <div className="sideMenu_content">
        <div className="sideMenu_avatar mt-5">
          <div className="mx-auto">
            <img
              // src={require("../assets/img/Bugtifyimg/avatar.jpg").default}
              src={currentUser?.avatar}
              alt="avatar"
              className="img-fluid"></img>
          </div>

          <h5 className="name text-center mt-2">{currentUser?.name}</h5>
        </div>
        <div className="sideMenu_social">
          <Tooltip placement="top" title={currentUser?.email}>
            <i
              className="fa fa-envelope"
              style={{marginTop: "8px", cursor: "pointer"}}></i>
          </Tooltip>
          <a>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a>
            <i className="fab fa-github"></i>
          </a>
        </div>
        <hr></hr>
        <div className="sideMenu_items">
          <div>
            <Link
              to="/projectmanagement"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={() => {
                dispatch({
                  type: MODAL_CREATE,
                  createModal: CreateProjectModal,
                });
              }}>
              Create Project
            </Link>
          </div>
          <div>
            <Link to="/projectmanagement">Project Management</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
