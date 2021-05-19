import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import * as Yup from "yup";
import {connect} from "react-redux";
import {withFormik} from "formik";
import {
  EDIT_USER_SAGA,
  FUNCTION_SUBMIT,
} from "../../redux/constant/BugtifyConstant";
import {ModalHeader} from "../../HOC/ModalHeader";
function EditUser(props) {
  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: FUNCTION_SUBMIT,
      functionSubmit: handleSubmit,
    });
  }, []);
  return (
    <div>
      <ModalHeader Component={<span>Edit User</span>} />
      <form
        className="form-group user-settings-content-form py-4"
        onSubmit={handleSubmit}>
        <div className="w-75 mx-auto">
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
              value={values.passWord}
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
              value={values.confirmPassword}
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
      </form>
    </div>
  );
}
const EditUserManagementPages = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {targetUser} = props;
    return {
      id: targetUser?.userId,
      email: targetUser?.email,
      passWord: "",
      name: targetUser?.name,
      phoneNumber: targetUser?.phoneNumber,
      confirmPassword: "",
      avatar: targetUser?.avatar,
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
  handleSubmit: (values, {props, setSubmitting, setFieldValue}) => {
    props.dispatch({
      type: EDIT_USER_SAGA,
      user: values,
    });
    setFieldValue("passWord", "");
    setFieldValue("confirmPassword", "");
  },

  displayName: "SignUpForm",
})(EditUser);

const mapStateToProps = (state) => {
  return {
    targetUser: state.UserReducer.targetUser,
  };
};
export default connect(mapStateToProps)(EditUserManagementPages);
