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
import ProjectInfo from "./pages/ProjectInfo/ProjectInfo";
export default function App() {
  const {ModalComponent} = useSelector((state) => state.ModalReducer);

  return (
    <div className="app">
      {ModalComponent && <ModalTemplate Component={ModalComponent} />}

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
        <BugtifyTemplate exact path="/project/:id" Component={ProjectInfo} />
      </Switch>
    </div>
  );
}
