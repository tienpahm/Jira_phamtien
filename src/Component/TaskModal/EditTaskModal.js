import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ModalHeader} from "../../HOC/ModalHeader";
import ReactHtmlParser from "react-html-parser";
import {Input, Progress} from "antd";
import {
  DELETE_COMMENT_SAGA,
  DELETE_USER_TASK_SAGA,
  FUNCTION_SUBMIT,
  GET_ALL_COMMENT_SAGA,
  GET_PRIORITY_LIST_SAGA,
  GET_TASK_TYPE_SAGA,
  INSERT_COMMENT_SAGA,
  REMOVE_USER_FROM_TASK,
  UPDATE_ASIGNESS_LIST,
  UPDATE_COMMENT_SAGA,
  UPDATE_TASK_SAGA,
} from "../../redux/constant/BugtifyConstant";
import "./EditTaskModal.css";
import {Editor} from "@tinymce/tinymce-react";
import {withFormik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Select} from "antd";
import {Fragment} from "react";

function EditTaskModal(props) {
  //with formik props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  //get data from redux
  const {arrTaskType, arrPriority, arrStatus, targetTask, listTaskComment} =
    useSelector((state) => state.TaskReducer);
  const {targetProject} = useSelector((state) => state.ProjectReducer);
  //get data to render
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_PRIORITY_LIST_SAGA,
    });
    dispatch({
      type: GET_ALL_COMMENT_SAGA,
      taskId: targetTask?.taskId,
    });
    dispatch({
      type: FUNCTION_SUBMIT,
      functionSubmit: handleSubmit,
    });
  }, [targetTask]);

  //render edit comment
  /* tạo ra một cái function tạo 1 cái biến */

  //set show up text area effect
  const [commentId, setCommentId] = useState("");
  const [visibleComment, setvisibleComment] = useState(false);
  const [visibleEditor, setvisibleEditor] = useState(false);
  const [visibleAssignees, setVisibaleAsignees] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader Component={`Edit Task : ID ${targetTask?.taskId}`} />
      <div className="form-group">
        <select
          onChange={handleChange}
          name="typeId"
          value={values.typeId}
          className="border-0 rounded mx-2 my-2">
          {arrTaskType?.map((type, index) => {
            return (
              <option value={type.id} key={index}>
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
            <div className="editTask_taskName text-center">
              {targetTask?.taskName}
            </div>
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
                  value={values?.description}
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
                  onEditorChange={(content, editor) => {
                    setFieldValue("description", content);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: UPDATE_TASK_SAGA,
                      taskUpdate: values,
                    });
                  }}
                  className="btn btn-save p-1 mt-1">
                  Save
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-cancel p-1 mt-1"
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
            <div>
              <div className="row">
                <div className="col-1 font-weight-bold">
                  {targetProject.creator.name.toUpperCase()}
                </div>
                <div className="col-11">
                  {visibleComment ? (
                    <Fragment>
                      {" "}
                      <Input.TextArea
                        className="inputComment"
                        onChange={handleChange}
                        name="comment"
                        value={values.comment}
                        placeholder="Add comment"
                        row={4}
                      />
                      <div className="comment_button">
                        <button
                          type="button"
                          className="btn-save"
                          onClick={() => {
                            dispatch({
                              type: INSERT_COMMENT_SAGA,
                              comment: {
                                contentComment: values.comment,
                                taskId: targetTask?.taskId,
                              },
                            });
                            setFieldValue("comment", "");
                          }}>
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => {
                            setvisibleComment(false);
                          }}>
                          Cancel
                        </button>
                      </div>
                    </Fragment>
                  ) : (
                    <div
                      className="comment-placeholder"
                      onClick={() => {
                        setvisibleComment(true);
                      }}>
                      Add a comment ..
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="comment-block">
              {listTaskComment?.map((item, index) => {
                return !(item.id == commentId) ? (
                  <div key={index} className="comment_content">
                    <div className="row">
                      <div className="col-1">
                        <div className="comment_avatar">
                          <img src={item.user.avatar} alt="" />
                        </div>
                      </div>
                      <div className="col-11">
                        {" "}
                        <div className="comment_detail ml-2">
                          <div className="row">
                            <div className="col-10">
                              <div className="pl-1">
                                <p>{item.user.name.toUpperCase()}</p>
                                {item.contentComment}
                              </div>{" "}
                            </div>
                            <div className="col-2 text-right">
                              <div>
                                <button
                                  type="button"
                                  className="btn-delete"
                                  onClick={() => {
                                    dispatch({
                                      type: DELETE_COMMENT_SAGA,
                                      comment: {
                                        commentId: item.id,
                                        taskId: item.taskId,
                                      },
                                    });
                                  }}>
                                  <i className="fa fa-trash-alt"></i>
                                </button>
                                <button
                                  id={item.id}
                                  type="button"
                                  className="btn-edit"
                                  onClick={(e) => {
                                    setCommentId(
                                      e.currentTarget.getAttribute("id")
                                    );
                                    setFieldValue(
                                      "commentEdit",
                                      item.contentComment
                                    );
                                  }}>
                                  <i className="fa fa-edit"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                ) : (
                  <div key={index} className="row my-2 ml-1">
                    <div className="col-1 font-weight-bold">
                      {targetProject.creator.name.toUpperCase()}
                    </div>
                    <div className="col-11">
                      <Input.TextArea
                        onChange={handleChange}
                        name="commentEdit"
                        value={values.commentEdit}
                        placeholder="Add comment"
                        row={4}
                      />
                      <div className="comment_button">
                        <button
                          type="button"
                          className="btn-save"
                          onClick={() => {
                            dispatch({
                              type: UPDATE_COMMENT_SAGA,
                              comment: {
                                contentComment: values.commentEdit,
                                taskId: targetTask?.taskId,
                                commentId: item.id,
                              },
                            });
                            setFieldValue("commentEdit", "");
                            setCommentId("");
                          }}>
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => {
                            setCommentId("");
                            setFieldValue("commentEdit", "");
                          }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="editTask_status form_control">
            <span className="title">STATUS</span>
            <select
              onChange={handleChange}
              name="statusId"
              value={values.statusId}
              className="form-control">
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
              <div>
                {targetTask?.assigness.map((user, index) => {
                  return (
                    <div key={index} className="assignees_avatar">
                      <img src={user.avatar} alt="" />{" "}
                      <span style={{fontSize: "0.8rem"}}>{user.name}</span>
                      <button
                        onClick={() => {
                          dispatch({
                            type: REMOVE_USER_FROM_TASK,
                            // taskRemove: {
                            //   taskId: targetTask.taskId,
                            //   userId: user.id,
                            // },
                            userId: user.id,
                          });
                        }}>
                        x
                      </button>
                    </div>
                  );
                })}
              </div>

              {visibleAssignees ? (
                <Select
                  showSearch
                  style={{width: 200}}
                  placeholder="Select a person"
                  options={targetProject?.members
                    .filter((mem) => {
                      let index = targetTask?.assigness.findIndex(
                        (user) => user.id === mem.userId
                      );
                      if (index !== -1) {
                        return false;
                      }
                      return true;
                    })
                    .map((user, index) => {
                      return {label: user.name, value: user.userId};
                    })}
                  optionFilterProp="label"
                  onSelect={(value) => {
                    let listUserAsignUpdate = [...targetTask?.assigness];
                    let user = targetProject.members.find(
                      (user) => user.userId === value
                    );
                    listUserAsignUpdate.push({...user, id: user.userId});
                    setVisibaleAsignees(false);
                    setFieldValue(
                      "listUserAsign",
                      listUserAsignUpdate.map((item, index) => {
                        return item.id;
                      })
                    );
                    dispatch({
                      type: UPDATE_ASIGNESS_LIST,
                      targetProjectListUpdate: {
                        ...values,
                        assigness: listUserAsignUpdate,
                      },
                    });
                  }}></Select>
              ) : (
                <button
                  className="addmore"
                  type="button"
                  style={{
                    color: "#1762d1",
                    backgroundColor: "white",
                    border: "none",
                    outline: "none",
                  }}
                  onClick={() => {
                    setVisibaleAsignees(true);
                  }}>
                  + Add more
                </button>
              )}
            </div>
          </div>
          <div className="editTask_priority">
            <span className="title">PRIORITY</span>
            <select
              onChange={handleChange}
              value={values.priorityId}
              name="priorityId"
              className="form-control">
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
            <Input
              value={values.originalEstimate}
              onChange={handleChange}
              name="originalEstimate"
              type="number"
              min="0"></Input>
            <span className="title">TIME TRACKING</span>
            <Progress
              strokeLinecap="square"
              percent={Math.round(
                (values.timeTrackingSpent / values.originalEstimate) * 100
              )}
            />
            <span className="title">TIME SPENT</span>
            <Input
              onChange={handleChange}
              value={values.timeTrackingSpent}
              name="timeTrackingSpent"
              type="number"
              min="0"></Input>
          </div>
        </div>
      </div>
    </form>
  );
}

const EditTaskForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {targetTask} = props;
    return {
      listUserAsign: targetTask?.assigness.map((user, index) => {
        return user.id;
      }),
      comment: "",
      commentEdit: "",
      taskId: targetTask?.taskId,
      taskName: targetTask?.taskName,
      description: targetTask?.description,
      statusId: targetTask?.statusId,
      originalEstimate: targetTask?.originalEstimate,
      timeTrackingSpent: targetTask?.timeTrackingSpent,
      timeTrackingRemaining: targetTask?.timeTrackingRemaining,
      projectId: targetTask?.projectId,
      typeId: targetTask?.typeId,
      priorityId: targetTask?.priorityId,
    };
  },

  // Custom sync validation
  validationSchema: Yup.object().shape({
    taskName: Yup.string().required("Please Fill in Task Name"),
    description: Yup.string().required("Please Fill in Task Name"),
    originalEstimate: Yup.string().required("Please Fill in Task Name"),
    timeTrackingSpent: Yup.string().required("Please Fill in Task Name"),
    // listUserAsign: Yup.string().required("Please Fill in Task Name"),
  }),

  handleSubmit: (values, {props, setSubmitting, setValues}) => {
    props.dispatch({
      type: UPDATE_TASK_SAGA,
      taskUpdate: values,
    });
  },

  displayName: "Edit task  Formik",
})(EditTaskModal);
const mapStateToProps = (state) => {
  return {
    targetProject: state.ProjectReducer.targetProject,
    targetTask: state.TaskReducer.targetTask,
  };
};

export default connect(mapStateToProps)(EditTaskForm);
