import React, {Fragment, useEffect} from "react";
import {ModalHeader} from "../../HOC/ModalHeader";
import {useDispatch, useSelector} from "react-redux";
import "./ProjectInfo.css";
import {
  GET_PROJECT_DETAIL_SAGA,
  GET_STATUS_LIST_SAGA,
} from "../../redux/constant/BugtifyConstant";

export default function ProjectInfo(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      id: props.match.params.id,
    });
    dispatch({
      type: GET_STATUS_LIST_SAGA,
    });
  }, []);
  //get value from redux
  const {targetProject} = useSelector((state) => state.ProjectReducer);
  const {arrStatus} = useSelector((state) => state.TaskReducer);
  console.log("project ", targetProject);
  console.log("arrStatus", arrStatus);

  return (
    <div className="projectInfo">
      <div className="projectInfo_content">
        <ModalHeader
          Component={`Project Name : ${targetProject?.projectName}`}
        />
        <div className="task_member m-3">
          <div className="mr-3">
            <i className="fa fa-user mr-2"></i>Members :
          </div>
          <div className="d-flex">
            {targetProject?.members.map((user, index) => {
              return (
                <div className="user_content" key={index}>
                  {" "}
                  <img src={user.avatar} alt="" />
                  <div className="user_tooltip">
                    ID : {user.userId} <br />
                    Name : {user.name} <br />
                    Email : {user?.email} <br />
                    Phone : {user?.phoneNumber}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="task_content row">
          {arrStatus?.map((status, index) => {
            return (
              <div className="col-3">
                <div className="task_item">
                  <div className="task_header">
                    <h6>
                      {status.statusName} <span>.</span>
                    </h6>
                  </div>
                  <div className="task_list">
                    <div className="taskList_item">
                      <div className="item-content">Content</div>
                      <div className="item-footer">
                        <div>
                          {" "}
                          <i className="fa fa-flag"></i>{" "}
                          <i className="fa fa-arrow-up"></i>{" "}
                        </div>
                        <div>
                          {" "}
                          <i className="fa fa-user mr-2"></i>
                        </div>
                      </div>
                    </div>
                    <div className="taskList_item">123</div>
                    <div className="taskList_item">123</div>
                    <div className="taskList_item">123</div>
                  </div>
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
