import React, {Fragment, useEffect} from "react";
import {ModalHeader} from "../../HOC/ModalHeader";
import {useDispatch, useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";
import "./ProjectInfo.css";
import {
  GET_PROJECT_DETAIL_SAGA,
  GET_STATUS_LIST_SAGA,
  GET_TASK_DETAIL_SAGA,
  MODAL_EDIT,
  REMOVE_TASK_SAGA,
} from "../../redux/constant/BugtifyConstant";
import EditTaskModal from "../../Component/TaskModal/EditTaskModal";

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

  //render priority
  const renderPriority = (task) => {
    let color = "";
    const {priority, priorityId} = task.priorityTask;
    if (priorityId === 1) {
      color = "text-danger";
    } else if (priorityId === 2) {
      color = "text-warning";
    } else if (priorityId === 3) {
      color = "text-success";
    } else {
      color = "text-dark";
    }
    return <div className={color}>{priority}</div>;
  };

  return (
    <div className="projectInfo">
      <div className="projectInfo_content">
        <ModalHeader
          Component={`Project Name : ${targetProject?.projectName}`}
        />
        <div className="projectInfo_description p-2">
          <span>
            <i className="fa fa-hand-holding mr-2"></i>Description :{" "}
          </span>{" "}
          {ReactHtmlParser(targetProject?.description)}
        </div>
        <hr />
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
              <div key={index} className="col-3">
                <div className="task_item">
                  <div className="task_header">
                    <h6>
                      {status.statusName} <span>.</span>
                    </h6>
                  </div>
                  <div className="task_list">
                    {targetProject?.lstTask.map((taskList, index) => {
                      return (
                        taskList.statusId === status.statusId &&
                        taskList.lstTaskDeTail.map((task, index) => {
                          return (
                            <div key={index} className="taskList_item">
                              <div className="d-flex justify-content-between">
                                <div className="item-header font-weight-bold">
                                  {task.taskName}
                                </div>
                                {renderPriority(task)}
                              </div>
                              <div className="item-content">
                                {ReactHtmlParser(task.description)}
                              </div>
                              <div className="item-footer">
                                <div>
                                  {" "}
                                  <i
                                    className="fa fa-dumpster"
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_TASK_SAGA,
                                        taskId: task.taskId,
                                      });
                                    }}></i>{" "}
                                  <i
                                    className="fa fa-pen-square"
                                    data-toggle="modal"
                                    data-target="#exampleModalLong"
                                    onClick={() => {
                                      dispatch({
                                        type: MODAL_EDIT,
                                        editModal: EditTaskModal,
                                      });
                                      dispatch({
                                        type: GET_TASK_DETAIL_SAGA,
                                        taskId: task.taskId,
                                      });
                                    }}></i>{" "}
                                </div>
                                <div>
                                  {" "}
                                  {task.assigness?.map((user, index) => {
                                    return (
                                      <img
                                        key={index}
                                        src={user.avatar}
                                        alt=""
                                        style={{
                                          width: "25px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      );
                    })}
                    {/* <div className="taskList_item">
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
                    </div> */}
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
