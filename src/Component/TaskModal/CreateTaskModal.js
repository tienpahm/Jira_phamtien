import React, {useEffect, useState} from "react";
import {Fragment} from "react";
import {ModalHeader} from "../../HOC/ModalHeader";
import {Editor} from "@tinymce/tinymce-react";
import {Progress} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {withFormik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";
import {
  CREATE_TASK_SAGA,
  FUNCTION_SUBMIT,
  GET_PRIORITY_LIST_SAGA,
  GET_TASK_TYPE_SAGA,
} from "../../redux/constant/BugtifyConstant";
import {Select} from "antd";

function CreateTaskModal(props) {
  const {values, errors, handleChange, handleSubmit, setFieldValue, setValues} =
    props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_PRIORITY_LIST_SAGA,
    });
    dispatch({
      type: FUNCTION_SUBMIT,
      functionSubmit: handleSubmit,
    });
  }, []);
  //Get data for list and projectDetail
  const {targetProject} = props;

  const {arrTaskType, arrPriority, arrStatus} = useSelector(
    (state) => state.TaskReducer
  );

  //Handle select assignees

  const children = targetProject?.members.map((user, index) => {
    return {label: user.name, value: user.userId};
  });

  return (
    <Fragment>
      <ModalHeader
        Component={
          <Fragment>
            <span>Create Issues</span> <br />
            <span>Project Name : {targetProject?.projectName}</span>
          </Fragment>
        }
      />
      <form onSubmit={handleSubmit} className="p-3">
        <div className="form-group ">
          <p>
            <i className="fa fa-scroll text-success mr-1"></i> Issues Name{" "}
          </p>
          <input
            value={values.taskName}
            name="taskName"
            onChange={handleChange}
            className="form-control"></input>
          <span>require*</span>{" "}
          <span className="text-danger">{errors.taskName}</span>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p>
                <i className="fa fa-bug text-danger mr-1"></i> Issues Type{" "}
              </p>
              <select
                className="form-control"
                onChange={handleChange}
                name="typeId"
                value={values.typeId}>
                {arrTaskType?.map((type, index) => {
                  return (
                    <option key={index} value={type.id}>
                      {type.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <p>
                <i className="fab fa-stack-exchange mr-1"></i> Status{" "}
              </p>
              <select
                value={values.statusId}
                className="form-control"
                onChange={handleChange}
                name="statusId">
                {arrStatus.map((status, index) => {
                  return (
                    <option key={index} value={status.statusId}>
                      {status.statusName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <span>Description</span>
          <span className="ml-1 text-danger">{errors.description}</span>
          <Editor
            value={values.description}
            name="description"
            // initialValue={values.description}
            //   value={values.description}
            init={{
              height: 300,
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
        </div>
        <div className="form-group">
          <p>
            <i className="fa fa-arrow-up text-warning"></i>
            <i className="fa fa-arrow-down text-warning mr-1"></i>Priority{" "}
          </p>
          <select
            value={values.priorityId}
            className="form-control"
            onChange={handleChange}
            name="priorityId">
            {arrPriority?.map((prior, index) => {
              return (
                <option key={index} value={prior.priorityId}>
                  {prior.description}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <span>
            {" "}
            <i className="fa fa-user mr-1"></i> Assignees{" "}
          </span>
          <span>{errors.listUserAsign}</span>
          <Select
            value={values.listUserAsign}
            mode="multiple"
            allowClear
            style={{width: "100%"}}
            placeholder="Please select"
            options={children}
            optionFilterProp="label"
            onChange={(values) => {
              setFieldValue("listUserAsign", values);
            }}></Select>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-3">
              <p>
                <i className="fa fa-clock mr-1 text-success"></i>Original
                Estimate
              </p>
              <input
                value={values.originalEstimate}
                name="originalEstimate"
                onChange={handleChange}
                className="form-control"
                type="number"
                min="0"></input>
            </div>
            <div className="col-3">
              <p>
                <i className="fa fa-clock mr-1 text-danger"></i>Time Spent
              </p>
              <input
                values={values.timeTrackingSpent}
                onChange={handleChange}
                name="timeTrackingSpent"
                className="form-control"
                type="number"
                min="0"></input>
            </div>
            <div className="col-6">
              <p>
                <i
                  className="fa fa-stopwatch mr-1"
                  style={{color: "#7149fc"}}></i>
                Time Tracking
              </p>
              <Progress
                strokeLinecap="square"
                percent={Math.round(
                  (values.timeTrackingSpent / values.originalEstimate) * 100
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
const CreateTaskForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {targetProject} = props;
    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "1",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: targetProject?.id,
      typeId: 1,
      priorityId: 1,
    };
  },

  // Custom sync validation
  validationSchema: Yup.object().shape({
    taskName: Yup.string().required("Please Fill in Task Name"),
    description: Yup.string().required("Please Fill in Description"),
    // listUserAsign: Yup.string().required("Please Fill in Task Name"),
  }),

  handleSubmit: (values, {props, setSubmitting, setValues}) => {
    props.dispatch({
      type: CREATE_TASK_SAGA,
      project: values,
      projectId: values.projectId,
    });
  },

  displayName: "Create Project Formik",
})(CreateTaskModal);
const mapStateToProps = (state) => {
  return {
    targetProject: state.ProjectReducer.targetProject,
  };
};

export default connect(mapStateToProps)(CreateTaskForm);
