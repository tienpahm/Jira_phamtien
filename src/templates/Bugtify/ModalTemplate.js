import React from "react";
import {useSelector} from "react-redux";

const ModalTemplate = (props) => {
  const {Component, ...restParam} = props;
  const {functionSubmit} = useSelector((state) => state.ProjectReducer);
  console.log(functionSubmit);

  return (
    <div
      class="modal fade bd-example-modal-lg"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <Component />
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
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
