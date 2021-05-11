import React, {useEffect, useState, useRef} from "react";
import {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Editor} from "@tinymce/tinymce-react";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_CATEGORY_SAGA,
  FUNCTION_SUBMIT,
} from "../redux/constant/BugtifyConstant";
import {ModalHeader} from "../HOC/ModalHeader";

export default function CreateProjectModal() {
  const dispatch = useDispatch();
  const {arrCategory} = useSelector((state) => state.CategoryReducer);
  //validation
  const [erros, setError] = useState("require*");
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    categoryId: "1",
  });
  useEffect(() => {
    dispatch({
      type: FUNCTION_SUBMIT,
      functionSubmit: handleSubmit,
    });
  }, [project]);
  // take values from input

  const handleChange = (e) => {
    let {name, value} = e.target;
    console.log(project);
    setProject({
      ...project,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    console.log(project);
    e.preventDefault();
    if (!project.projectName) {
      return false;
    }

    dispatch({
      type: CREATE_PROJECT_SAGA,
      project: project,
    });
  };

  return (
    <Fragment>
      <ModalHeader Component="Create Project" />
      <form onSubmit={handleSubmit} className="modal-body container">
        <div className="form-group">
          <h6>Name</h6>
          <input
            name="projectName"
            onChange={handleChange}
            className="form-control"></input>
          <p style={{marginTop: "5px"}}>{erros}</p>
        </div>
        <h6>Description</h6>
        <Editor
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
            setProject({
              ...project,
              description: content,
            });
          }}
        />
        <div className="form-group mt-2">
          <h6>Category</h6>
          <select
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
    </Fragment>
  );
}
