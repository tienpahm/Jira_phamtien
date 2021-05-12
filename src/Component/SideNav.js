import React from "react";
import "./SideNav.css";

export default function SideNav() {
  return (
    <div className="col-2 sideNav">
      <div className="sideNav_button">
        <button>
          <i className="fa fa-plus"></i>
        </button>
        <div className="sideNav_tooltip">Create Task</div>
      </div>
    </div>
  );
}
