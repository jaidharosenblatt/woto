import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBarDecider from "./components/NavBar/NavBarDecider";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarDecider isSignedIn={true} />
        <div>
          <Route path="/help" exact component={Help} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/addcourse" exact component={AddCourse} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
