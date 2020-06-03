import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={} />
          <Route path="/pagetwo" exact component={} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
