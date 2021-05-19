import React from "react";
import {Link} from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="container">
      <img
        src={require("../../assets/img/Bugtifyimg/404-old.gif").default}
        alt=""
        className="img-fluid w-100"
      />
      <div className="text-center" style={{marginTop: "-50px"}}>
        <Link to="/" style={{fontSize: "1.2rem"}}>
          Back To Login Page
        </Link>
      </div>
    </div>
  );
}
