import React from "react";
import {useSelector} from "react-redux";

const ModalTemplate = (props) => {
  const {Component, ...restParam} = props;
  const {functionSubmit} = useSelector((state) => state.ProjectReducer);

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="exampleModalLong"
      tabIndex="-1"
      role="dialog"
      style={{marginTop: "10px"}}
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <Component />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={functionSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalTemplate;
