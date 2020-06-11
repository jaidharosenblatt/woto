import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AddCourse from "./pages/addcourse/AddCourse";
<<<<<<< HEAD

=======
>>>>>>> 2bc71d4ad03fec15df1f943d3b089d7b23e05200
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
          <Route path="/addcourse" exact component={AddCourse} />
<<<<<<< HEAD
    
=======
>>>>>>> 2bc71d4ad03fec15df1f943d3b089d7b23e05200
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
