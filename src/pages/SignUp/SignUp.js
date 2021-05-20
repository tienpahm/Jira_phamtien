import {withFormik} from "formik";
import React from "react";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {connect} from "react-redux";
import {SIGN_UP_USER_SAGA} from "../../redux/constant/BugtifyConstant";

function SignUp(props) {
  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    props;

  return (
    <div className="login">
      <div className="row login_content ">
        <div className="col-6 login_content_left">
          <div className="login_content_left_title">
            <h3 style={{color: "white"}}>
              BUGTIFY<span>.</span>
            </h3>
          </div>
          <div className="login_content_left_description">
            <p>
              <span>Where</span> Your Favourite List of Bug Stay{" "}
            </p>
            <p style={{maxWidth: "50%"}}>
              <span>BUGTIFY .</span> is a proprietary issue tracking product
              that allows bug tracking and agile project management
            </p>
          </div>
        </div>
        <div className="col-6 login_content_right">
          <form className="form-group" onSubmit={handleSubmit}>
            <div>
              <h4 className="text-center pb-2">SIGN UP</h4>
              <div className="mb-2" style={{marginLeft: "16%"}}>
                <i className="fa fa-user text-success"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("name");
                    handleChange(e);
                  }}
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
              <div className="mb-2" style={{marginLeft: "16%"}}>
                <i className="fa fa-envelope"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("email");
                    handleChange(e);
                  }}
                  name="email"
                  placeholder="Email"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                  }}
                  className="errors_email">
                  {touched.email && errors.email}
                </div>
              </div>
              <div className="mb-2" style={{marginLeft: "16%"}}>
                <i className="fa fa-phone text-warning"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("phoneNumber");
                    handleChange(e);
                  }}
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                  }}
                  className="errors_phone">
                  {touched.phoneNumber && errors.phoneNumber}
                </div>
              </div>

              <div className="mb-2" style={{marginLeft: "16%"}}>
                <i className="fa fa-lock text-danger"></i>{" "}
                <input
                  onChange={(e) => {
                    setFieldTouched("passWord");
                    handleChange(e);
                  }}
                  name="passWord"
                  placeholder="Password"
                  type="password"></input>
                <div
                  style={{
                    width: "100%",
                    height: "15px",
                    marginLeft: "4%",
                    fontSize: "14px",
                  }}
                  className="errors_password">
                  {touched.passWord && errors.passWord}
                </div>
              </div>
              <div style={{marginLeft: "16%"}}>
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
                    color: "#7149fc",
                    fontSize: "14px",
                  }}
                  className="errors_password">
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
              </div>
            </div>
            <div className="login_content_right_button text-center">
              <button type="submit">
                <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
            <div className="text-right mt-3 mr-2">
              <Link to="/" style={{fontSize: "0.8rem"}}>
                Back to login ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const SignUpPages = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
      confirmPassword: "",
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
      type: SIGN_UP_USER_SAGA,
      user: values,
    });
  },

  displayName: "SignUpForm",
})(SignUp);

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(SignUpPages);
