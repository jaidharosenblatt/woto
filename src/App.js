import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBarDecider";

const DefaultContainer = () => {
  return (
    <Layout>
      <NavBar state={"signedIn"} />
      <div className="PageContainer">
        <Route path="/help" exact component={Help} />
        <Route path="/addcourse" exact component={AddCourse} />
      </div>
    </Layout>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/help" exact component={DefaultContainer} />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
