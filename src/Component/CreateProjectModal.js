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

export default function CreateProjectModal() {
  const dispatch = useDispatch();
  const {arrCategory} = useSelector((state) => state.CategoryReducer);
  //validation
  const [erros, setError] = useState("require*");
  useEffect(() => {
    dispatch({
      type: FUNCTION_SUBMIT,
      functionSubmit: handleSubmit,
    });
  }, []);
  // take values from input
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    categoryId: "1",
  });

  const handleChange = (e) => {
    let {name, value} = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
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
      <div class="modal-header">
        <h3 style={{color: "#191919", marginBottom: "0"}}>
          BUGTIFY
          <span
            style={{
              color: "#7149fc",
              fontSize: "2rem",
              display: "inline-block",
              marginLeft: "5px",
            }}>
            .
          </span>{" "}
          <p style={{fontSize: "1.2rem"}} className="mb-0">
            Create Project
          </p>
        </h3>

        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={handleSubmit} class="modal-body container">
        <div className="form-group">
          <h6>Name</h6>
          <input
            name="projectName"
            onChange={handleChange}
            className="form-control"></input>
          <p style={{marginTop: "5px"}}>{erros}</p>
        </div>
        <h6>Description</h6>
        {/* <Editor
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
        /> */}
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
        <button type="submit">submit</button>
      </form>
    </Fragment>
  );
}
