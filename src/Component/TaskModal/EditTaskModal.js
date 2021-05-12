import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ModalHeader} from "../../HOC/ModalHeader";
import ReactHtmlParser from "react-html-parser";
import {Input, Progress} from "antd";
import {
  FUNCTION_SUBMIT,
  GET_PRIORITY_LIST_SAGA,
  GET_TASK_TYPE_SAGA,
} from "../../redux/constant/BugtifyConstant";
import "./EditTaskModal.css";
import {Editor} from "@tinymce/tinymce-react";

export default function EditTaskModal() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_PRIORITY_LIST_SAGA,
    });
    // dispatch({
    //   type: FUNCTION_SUBMIT,
    //   functionSubmit: handleSubmit,
    // });
  }, []);
  const {arrTaskType, arrPriority, arrStatus, targetTask} = useSelector(
    (state) => state.TaskReducer
  );
  //set show up text area effect
  const [visible, setvisible] = useState(false);
  const [visibleEditor, setvisibleEditor] = useState(false);
  return (
    <div>
      <ModalHeader Component={`Edit Task : ID ${targetTask?.taskId}`} />
      <div className="form-group">
        <select className="border-0 rounded mx-2 my-2">
          {arrTaskType?.map((type, index) => {
            return (
              <option value={type.typeId} key={index}>
                {type.taskType}
              </option>
            );
          })}
        </select>
      </div>
      <div className="container-fluid row editTask_content p-2">
        <div className="col-8">
          <div>
            <span className="title">NAME</span>
            {visible ? (
              <div>
                <Input value={targetTask?.taskName}></Input>
                <button onClick={() => {}} className="btn btn-primary p-1 mt-1">
                  Save
                </button>{" "}
                <button
                  className="btn btn-primary p-1 mt-1"
                  onClick={() => {
                    setvisible(false);
                  }}>
                  Cancel
                </button>
              </div>
            ) : (
              <div
                className="editTask_taskName"
                onClick={() => {
                  setvisible(true);
                }}>
                {targetTask?.taskName}
              </div>
            )}
          </div>

          <div className="editTask_description">
            <span className="title mt-2">Description</span>
            {!visibleEditor ? (
              <div
                onClick={() => {
                  setvisibleEditor(true);
                }}>
                {ReactHtmlParser(targetTask?.description)}
              </div>
            ) : (
              <div>
                <Editor
                  value={targetTask?.description}
                  name="description"
                  // initialValue={values.description}
                  //   value={values.description}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={(content, editor) => {}}
                />
                <button onClick={() => {}} className="btn btn-primary p-1 mt-1">
                  Save
                </button>{" "}
                <button
                  className="btn btn-primary p-1 mt-1"
                  onClick={() => {
                    setvisibleEditor(false);
                  }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="editTask_comment">
            <span className="title">Comments</span>
            <Input.TextArea row={4} />
          </div>
        </div>

        <div className="col-4">
          <div className="editTask_status form_control">
            <span className="title">STATUS</span>
            <select className="form-control">
              {arrStatus?.map((status, index) => {
                return (
                  <option key={index} value={status.statusId}>
                    {status.statusName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="editTask_assignees">
            <div className="title">ASSIGNEES</div>
            <div>
              {targetTask?.assigness.map((user, index) => {
                return (
                  <img
                    key={index}
                    src={user.avatar}
                    alt=""
                    style={{width: "40px"}}
                  />
                );
              })}
            </div>
          </div>
          <div className="editTask_priority">
            <span className="title">PRIORITY</span>
            <select className="form-control">
              {arrPriority?.map((prior, index) => {
                return (
                  <option key={index} value={prior.priorityId}>
                    {prior.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="editTask_times">
            <span className="title">ORINGINAL ESTIMATE (HOURS)</span>
            <Input></Input>
            <span className="title">TIME TRACKING</span>
            <Progress strokeLinecap="square" percent={75} />
            <span className="title">TIME SPENT</span>
            <Input></Input>
          </div>
        </div>
      </div>
    </div>
  );
}
