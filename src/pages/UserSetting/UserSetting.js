import React, {useEffect} from "react";
import "./UserSetting.css";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {connect} from "react-redux";
import {withFormik} from "formik";
import {
  CURRENT_USER,
  EDIT_USER_SAGA,
  TRIGGER_CREATE_TASK,
} from "../../redux/constant/BugtifyConstant";

function UserSetting(props) {
  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    props;
  const dispatch = useDispatch();
  const dataUser = JSON.parse(localStorage.getItem("USER_LOGIN"));

  useEffect(() => {
    dispatch({
      type: CURRENT_USER,
      currentUser: JSON.parse(localStorage.getItem("USER_LOGIN")),
    });
    dispatch({
      type: TRIGGER_CREATE_TASK,
      trigger: false,
    });
  }, []);
  return (
    <div className="user-settings">
      <div className="user-settings-content row">
        <div className="col-3">
          <div className="user-settings-content-info text-center mt-5">
            <img className="avatar" alt="" src={dataUser.avatar} />
            <p className="mb-0 mt-2">
              {" "}
              <span></span>Name : {props.currentUser?.name.toUpperCase()}
            </p>
            <div className="user-social">
              <div className="sideMenu_social">
                <p>
                  <i className="fa fa-envelope mr-1"></i>
                  <span>{props.currentUser?.email}</span>
                </p>
                <p>
                  <i className="fab fa-facebook-f mr-1"></i>
                  <span>Upcoming</span>
                </p>
                <p>
                  <i className="fab fa-github mr-1"></i>
                  <span>Upcoming</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9 d-flex justify-content-center ">
          <form
            className="form-group user-settings-content-form d-flex flex-column justify-content-center align-items-center w-75"
            onSubmit={handleSubmit}>
            <div className="w-100">
              <h5 className="text-center pb-2">Change Information</h5>
              <div className="mb-2">
                <i className="fa fa-user text-success"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("name");
                    handleChange(e);
                  }}
                  value={values.name}
                  name="name"
                  placeholder="Username"></input>
                <div
                  style={{
                    color: "#7149fc",
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                  }}
                  className="errors_name">
                  {errors.name}
                </div>
              </div>
              <div className="mb-2">
                <i className="fa fa-envelope"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("email");
                    handleChange(e);
                  }}
                  name="email"
                  value={values.email}
                  placeholder="Email"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                    color: "#7149fc",
                  }}
                  className="errors_email">
                  {touched.email && errors.email}
                </div>
              </div>
              <div className="mb-2">
                <i className="fa fa-phone text-warning"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("phoneNumber");
                    handleChange(e);
                  }}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                    color: "#7149fc",
                  }}
                  className="errors_phone">
                  {touched.phoneNumber && errors.phoneNumber}
                </div>
              </div>

              <div className="mb-2">
                <i className="fa fa-lock text-danger"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("passWord");
                    handleChange(e);
                  }}
                  name="passWord"
                  placeholder="New Password"
                  type="password"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                    color: "#7149fc",
                  }}
                  className="errors_password">
                  {touched.passWord && errors.passWord}
                </div>
              </div>
              <div>
                <i className="fa fa-lock text-danger"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("confirmPassword");
                    handleChange(e);
                  }}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                    color: "#7149fc",
                  }}
                  className="errors_password">
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
              </div>
            </div>

            <div className="login_content_right_button text-center">
              <button type="submit" style={{outline: "none"}}>
                <i className="fa fa-edit"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const EditUserPages = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {currentUser} = props;
    return {
      id: currentUser?.id,
      email: currentUser?.email,
      passWord: "",
      name: currentUser?.name,
      phoneNumber: currentUser?.phoneNumber,
      confirmPassword: "",
      avatar: currentUser?.avatar,
    };
  },
  validateOnChange: true,

  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required("Required"),
    passWord: Yup.string()
      .min(6, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("passWord"), null],
      "Passwords must match"
    ),
    name: Yup.string()
      .matches(/^(?!\s+$)/, "White space do not allow at the begin")
      .max(20, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(6, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  }),
  handleSubmit: (values, {props, setSubmitting}) => {
    props.dispatch({
      type: EDIT_USER_SAGA,
      user: values,
      flag: true,
    });
  },

  displayName: "SignUpForm",
})(UserSetting);

const mapStateToProps = (state) => {
  return {
    currentUser: state.UserReducer.currentUser,
  };
};
export default connect(mapStateToProps)(EditUserPages);
