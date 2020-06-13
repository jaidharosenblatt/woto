import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import Dashboard from "./pages/dashboard/Home";

import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBarDecider";

// Will be migrated after Modals are robust ----------------------------------------------------
import Popup from "./components/Modals/Popup";
import TurnHelpModal from './components/Modals/TurnHelpModal';
import { Bell, Spiderman } from "./static/Images";
// ----------------------------------------------------------------------------------------------

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
    
    // Remove later ---------------------------------------------------------------------------------
    const Avatar = {
        name: "Peter Parker",
        position: "Graduate Teaching Assistant",
        icon: Spiderman
    };
    // ----------------------------------------------------------------------------------------------

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Switch>
          <Route
            path={["/signin", "/signup", "/dashboard"]}
            component={NoNavBarContainer}
          />
          <Route component={NavBarContainer} />
        </Switch>
      </BrowserRouter> */}

      
      <Popup 
          buttonText="Button" 
          content={TurnHelpModal} 
          avatar={Avatar}
          modalIcon= {Bell}
       />
    </div>
  );
};

export default App;
