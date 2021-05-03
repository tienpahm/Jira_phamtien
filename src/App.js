import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import CreateProjectModal from "./Component/CreateProjectModal";
import EditProjectModal from "./Component/EditProjectModal";
import LoadingPage from "./Component/LoadingPage";
import login from "./pages/Login/login";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import BugtifyTemplate from "./templates/Bugtify/BugtifyTemplate";
import ModalTemplate from "./templates/Bugtify/ModalTemplate";
import {useSelector} from "react-redux";
export default function App() {
  const {modalComponent} = useSelector((state) => state.ModalReducer);

  return (
    <div className="app">
      <ModalTemplate
        Component={() => {
          return modalComponent;
        }}
      />

      <LoadingPage />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={login} />
        {/* <Route exact path="/projectmanagement" component={ProjectManagement} /> */}
        <BugtifyTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
      </Switch>
    </div>
  );
}
