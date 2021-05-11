import React, {useEffect, useState} from "react";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ModalHeader} from "../HOC/ModalHeader";
import {
  FUNCTION_SUBMIT,
  UPDATE_PROJECT_SAGA,
} from "../redux/constant/BugtifyConstant";
import "./EditProjectModal.css";
import {Editor} from "@tinymce/tinymce-react";
import {withFormik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";

function EditProjectModal(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const dispatch = useDispatch();
  const {arrCategory} = useSelector((state) => state.CategoryReducer);
  const {editProject} = useSelector((state) => state.ProjectReducer);

  //validation
  const [erros, setError] = useState("require*");
  // const [project, setProject] = useState(editProject);

  useEffect(() => {
    dispatch({
      type: FUNCTION_SUBMIT,
      functionSubmit: handleSubmit,
    });
  }, []);
  // const handleChange = (e) => {
  //   let {name, value} = e.target;
  //   console.log(project);
  //   setProject({
  //     ...project,
  //     [name]: value,
  //   });
  // };
  // const handleSubmit = (e) => {
  //   console.log(project);
  //   e.preventDefault();
  //   if (!project.projectName) {
  //     return false;
  //   }

  //   dispatch({
  //     // type: CREATE_PROJECT_SAGA,
  //     project: project,
  //   });
  // };
  return (
    <Fragment>
      <ModalHeader Component={`Edit Project : ID ${editProject.id}`} />
      <div className="modal-body container">
        <form onSubmit={handleSubmit} className="modal-body container">
          <div className="form-group">
            <h6>Name</h6>
            <input
              value={values.projectName}
              name="projectName"
              onChange={handleChange}
              className="form-control"></input>
            <p style={{marginTop: "5px"}}>{erros}</p>
          </div>
          <h6>Description</h6>
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
          <div className="form-group mt-2">
            <h6>Category</h6>
            <select
              value={values.categoryId}
              name="categoryId"
              style={{padding: "5px 10px", borderColor: "transparent"}}
              onChange={handleChange}>
              {arrCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {editProject} = props;
    return {
      id: editProject?.id,
      projectName: editProject?.projectName,
      description: editProject?.description,
      categoryId: editProject?.categoryId,
    };
  },

  // Custom sync validation
  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Required"),
  }),

  handleSubmit: (values, {props, setSubmitting}) => {
    console.log("values", values);
    props.dispatch({
      type: UPDATE_PROJECT_SAGA,
      project: values,
    });
  },

  displayName: "Create Project Formik",
})(EditProjectModal);
const mapStateToProps = (state) => {
  return {
    editProject: state.ProjectReducer.editProject,
  };
};

export default connect(mapStateToProps)(EditProjectForm);
