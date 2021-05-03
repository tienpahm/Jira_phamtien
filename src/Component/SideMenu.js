import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {MODAL_CREATE} from "../redux/constant/BugtifyConstant";
import CreateProjectModal from "./CreateProjectModal";
import "./SideMenu.css";

export default function SideMenu() {
  const dispatch = useDispatch();
  return (
    <div className="col-10 sideMenu">
      {" "}
      <div className="sideMenu_content">
        <div className="sideMenu_avatar mt-5">
          <div className="mx-auto">
            <img
              src={require("../assets/img/Bugtifyimg/avatar.jpg").default}
              alt="avatar"
              className="img-fluid"></img>
          </div>

          <h5 className="name text-center">Phạm Tiến</h5>
        </div>
        <div className="sideMenu_social">
          <a>
            <i className="fa fa-envelope"></i>
          </a>
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
                  createModal: <CreateProjectModal />,
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
