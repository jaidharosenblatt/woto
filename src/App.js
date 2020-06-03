import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Help from "./pages/Help";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div>
          <Route path="/help" exact component={Help} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
