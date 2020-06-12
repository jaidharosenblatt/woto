import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBarDecider";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <div className="PageContainerNoNavBar">
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
          </div>
          <NavBar state={"signedIn"} />

          <div className="PageContainer">
            <Route path="/help" exact component={Help} />
            <Route path="/addcourse" exact component={AddCourse} />
          </div>
        </BrowserRouter>
      </Layout>
    </div>
  );
};

export default App;
