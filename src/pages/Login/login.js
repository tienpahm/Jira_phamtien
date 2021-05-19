import React from "react";
import "./login.css";
import {Link} from "react-router-dom";
import {withFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {LOGIN_SAGA} from "../../redux/constant/BugtifyConstant";

function Login(props) {
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
          <div className="sign_up">
            <p>
              New User ? <Link to="/signup">Sign up</Link>
            </p>
          </div>
          <form className="form-group" onSubmit={handleSubmit}>
            <div>
              <h4 className="text-center pb-2">SIGN IN</h4>
              <div className="mb-2" style={{marginLeft: "16%"}}>
                <i className="fa fa-user"></i>{" "}
                <input
                  onChange={handleChange}
                  name="email"
                  placeholder="Username"></input>
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
              <div style={{marginLeft: "16%"}}>
                <i className="fa fa-lock"></i>{" "}
                <input
                  onChange={handleChange}
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
            </div>
            <div className="login_content_right_button text-center">
              <button type="submit">
                <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const LoginPages = withFormik({
  mapPropsToValues: (props) => {
    return {email: "", passWord: ""};
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required("Required"),
    passWord: Yup.string()
      .min(6, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  }),
  handleSubmit: (values, {props, setSubmitting}) => {
    props.dispatch({
      type: LOGIN_SAGA,
      data: values,
    });
  },

  displayName: "LoginForm",
})(Login);

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(LoginPages);
