import React from "react";
<<<<<<< HEAD
import {BrowserRouter, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
=======
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
>>>>>>> origin
import Help from "./pages/help/Help";
import Dashboard from "./pages/dashboard/Home";

import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBarDecider";

const NavBarContainer = () => {
  return (
    <Layout>
      <NavBar signedIn />
      <div className="NavBarContainer">
        <Route path="/help" exact component={Help} />
        <Route path="/addcourse" exact component={AddCourse} />
      </div>
    </Layout>
  );
};

const NoNavBarContainer = () => {
  return (
    <div className="NoNavBarContainer">
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} />
    </div>
  );
};

const App = () => {
<<<<<<< HEAD
    return (<div className="App">
        <BrowserRouter>
            <NavBar/>
            <div><Route path="/help" exact="exact" component={Help}/>
                <Route path="/signin" exact="exact" component={SignIn}/>
                <Route path="/signup" exact="exact" component={SignUp}/>
            </div>
        </BrowserRouter>
    </div>);
=======
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path={["/signin", "/signup", "/dashboard"]}
            component={NoNavBarContainer}
          />
          <Route component={NavBarContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
>>>>>>> origin
};

export default App;
