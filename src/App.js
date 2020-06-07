import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import "./App.less";

const App = () => {
  return (
    <div className="App">
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
