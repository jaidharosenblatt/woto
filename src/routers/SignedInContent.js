import React from "react";
import { Route, Switch } from "react-router-dom";

import Help from "../pages/studenthelp/Help";
import TAHelp from "../pages/tahelp/TAHelp";

const RenderPage = ({ course }) => {
  if (course.role === "TA") {
    return <TAHelp course={course} />;
  }
  return <Help course={course} />;
};

const SignedInContent = ({ courses, routes, redirects }) => {
  return (
    <div className="NavBarContainer">
      <Switch>
        {routes}
        {courses.map((course) => {
          return (
            <Route
              key={course._id}
              exact
              path={`/${course._id}`}
              component={() => <RenderPage course={course} />}
            />
          );
        })}
        {redirects}
      </Switch>
    </div>
  );
};

export default SignedInContent;
