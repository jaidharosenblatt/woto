import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
