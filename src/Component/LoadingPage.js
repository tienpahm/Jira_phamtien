import React from "react";
import {useSelector} from "react-redux";

export default function LoadingPage() {
  const {isVisibleLoading} = useSelector((state) => state.LoadingReducer);
  if (isVisibleLoading) {
    return (
      <div>
        <img
          style={{
            position: "absolute",
            top: "0",
            left: " 0",
            zIndex: "2000",
            width: "99vw",
            height: "100vh",
          }}
          src={require("../assets/img/Bugtifyimg/loadingpage.gif").default}
          alt=""
        />
      </div>
    );
  } else {
    return <></>;
  }
}
