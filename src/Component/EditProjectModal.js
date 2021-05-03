import React from "react";
import {Fragment} from "react";
import "./EditProjectModal.css";

export default function EditProjectModal() {
  return (
    <Fragment>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          Modal title
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">EditProjectModal</div>
    </Fragment>
  );
}
