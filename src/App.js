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
import EndEncounterModal from './components/Modals/EndEncounterModal';
import AddCourseModal from './components/Modals/AddCourseModal';
import CancelQuestionModal from './components/Modals/CancelQuestionModal';
import { Bell, Spiderman, Plus } from "./static/Images";
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
        name: "John Smith",
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

    
    <div className="offset">
        <Popup 
            buttonText="Turn Help Modal" 
            content={TurnHelpModal} 
            avatar={Avatar}
            modalIcon= {Bell}
         />
         
         <Popup 
             buttonText="End Encounter Modal" 
             content={EndEncounterModal} 
             avatar={Avatar}
             modalIcon= {Bell}
          />
          
          <Popup 
              buttonText="Add Course Modal" 
              content={AddCourseModal} 
              avatar={Avatar}
              modalIcon= {Plus}
           />
           
           <Popup 
               buttonText="Cancel Question Modal" 
               content={CancelQuestionModal} 
               avatar={Avatar}
               modalIcon= {Bell}
            />
    </div>

    </div>
  );
};

export default App;
