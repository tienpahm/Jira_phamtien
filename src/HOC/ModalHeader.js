import React from "react";

export function ModalHeader(props) {
  const {Component} = props;
  return (
    <div className="modal-header">
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
          {Component}
        </p>
      </h3>

      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
