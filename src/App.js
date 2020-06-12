import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBarDecider";
const { Content } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <NavBar state={"signedIn"} />
          <Content style={{ paddingTop: 68 }}>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/help" exact component={Help} />
            <Route path="/addcourse" exact component={AddCourse} />
          </Content>
        </BrowserRouter>
      </Layout>
    </div>
  );
};

export default App;
