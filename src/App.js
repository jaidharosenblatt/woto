import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import "./App.less";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import AddCourse from "./pages/addcourse/AddCourse";
import NavBar from "./components/navbar/NavBar";
import AdminContainer from "./pages/dashboard/AdminContainer";
import Popup from "./components/Modals/Popup";
import TurnHelpModal from "./components/Modals/TurnHelpModal";
import EndEncounterModal from "./components/Modals/EndEncounterModal";
import CancelQuestionModal from "./components/Modals/CancelQuestionModal";
import ClearQueueModal from "./components/Modals/ClearQueueModal";
import VirtualRoomModal from "./components/Modals/VirtualRoomModal";
import { Bell, DefaultProfile, Plus, Video } from "./static/Images";
import { useFrameState } from "antd/lib/form/util";

/**
 * @jaidharosenblatt
 * Process for adding a new page
 * 1) Create new component in "/pages"
 * 2) Import page above
 * 3) Add as new Route (and think of a path to the page) to either NavBarContainer or NoNavBarContainer
 * 4) If NoNavBarContainer, then add path to first Route in App function
 */

// Temporary array of courses to create pages (replace with network call)
const courses = ["cs330", "cs250"];

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const NavBarContainer = () => {
  return (
    <Layout>
      <NavBar signedIn />
      <div className="NavBarContainer">
        <Route exact path="/">
          <Redirect to={`/${courses[0]}`} />
        </Route>
        {courses.map((course) => {
          return (
            <Route
              key={course}
              exact
              path={`/${course}`}
              component={() => <Help course={course} />}
            />
          );
        })}
        <Route path="/help" exact component={Help} />
        <Route path="/accountsettings" exact component={AccountSettings} />
      </div>
    </Layout>
  );
};

// Creates routes to pages that do not have navbar
const NoNavBarContainer = () => {
  return (
    <div className="NoNavBarContainer">
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/addcourse" exact component={AddCourse} />
      <Route
        path="/signup/addcourse"
        exact
        component={() => {
          return <AddCourse newUser />;
        }}
      />
    </div>
  );
};

/**
 * Renders our app =D
 * Specify paths where navbar should be hidden otherwise
 * assumes that all pages will be wrapped in navbar
 * Uses styling from "App.less"
 */
const App = () => {
  // Remove later ---------------------------------------------------------------------------------
  const user = {
    name: "Jaidha Rosenblatt",
    role: "Graduate Teaching Assistant",
    avatar: DefaultProfile,
  };

  // ----------------------------------------------------------------------------------------------

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={["/admin"]} component={AdminContainer} />
          <Route
            path={["/signin", "/signup", "/addcourse"]}
            component={NoNavBarContainer}
          />
          <Route component={NavBarContainer} />
        </Switch>
      </BrowserRouter>

      <div className="offset">
        <Popup
          buttonText="Turn Help Modal"
          content={TurnHelpModal}
          user={user}
        />

        <Popup
          buttonText="End Encounter Modal"
          content={EndEncounterModal}
          user={user}
        />

        <Popup
          buttonText="Cancel Question Modal"
          content={CancelQuestionModal}
          user={user}
        />

        {/*<Popup
          buttonText="Clear Queue TA Modal"
          content={ClearQueueModal}
          avatar={Avatar}
          modalIcon={Bell}
        />

        <Popup
          buttonText="Virtual Room TA Modal"
          content={VirtualRoomModal}
          avatar={Avatar}
          modalIcon={Video}
        /> */}
      </div>
    </div>
  );
};

export default App;
