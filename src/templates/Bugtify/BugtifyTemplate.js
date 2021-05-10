import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import SideMenu from "../../Component/SideMenu";
import SideNav from "../../Component/SideNav";

const BugtifyTemplate = (props) => {
  const {Component, ...restParam} = props;
  return (
    <Route
      path={restParam.path}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="container-fluid">
              <div className="row">
                <div className="col-3">
                  <div className="row">
                    <SideNav />

                    <SideMenu />
                  </div>
                </div>
                <div className="col-9 ">
                  <Component {...propsRoute} />
                </div>
              </div>
            </div>
          </Fragment>
        );
      }}
    />
  );
};

export default BugtifyTemplate;
