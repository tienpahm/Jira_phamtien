import React from "react";
import {ModalHeader} from "../../HOC/ModalHeader";
import "./ProjectInfo.css";

export default function ProjectInfo() {
  return (
    <div className="projectInfo">
      <div className="projectInfo_content">
        <ModalHeader Component="Name" />
        <div className="task_member m-3">Members</div>
        <div className="task_content row container">
          <div className="col-3">
            <div className="task_item">
              <div className="task_header">
                <h6>HEADER</h6>
              </div>
              <div className="task_list">
                <div className="taskList_item">
                  <span>
                    {" "}
                    ahihi ahihi ahihi ahihi ahihi ahihi ahihi ahihi ahihi ahihi
                    ahihi ahihi
                  </span>
                </div>
                <div className="taskList_item">123</div>
                <div className="taskList_item">123</div>
                <div className="taskList_item">123</div>
              </div>
            </div>{" "}
          </div>
          <div className="col-3">
            <div className="task_item">
              <div className="task_header">
                <h6>HEADER</h6>
              </div>
              <div className="task_list">
                <div className="taskList_item">123</div>
              </div>
            </div>{" "}
          </div>
          <div className="col-3">
            <div className="task_item">
              <div className="task_header">
                <h6>HEADER</h6>
              </div>
              <div className="task_list">
                <div className="taskList_item">123</div>
              </div>
            </div>{" "}
          </div>
          <div className="col-3">
            <div className="task_item">
              <div className="task_header">
                <h6>HEADER</h6>
              </div>
              <div className="task_list">
                <div className="taskList_item">123</div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
