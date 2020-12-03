import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import authActions from "./redux/auth/actionCreators";
import coursesActions from "./redux/courses/";
import selectors from "./redux/selectors";

import LoadingScreen from "./components/spinner/LoadingScreen";
import SignedOutRoutes from "./routers/SignedOutRoutes";
import SignedInRoutes from "./routers/SignedInRoutes";
import "./App.less";

/**
 * Renders our app =D
 * Specify paths where navbar should be hidden otherwise
 * assumes that all pages will be wrapped in navbar
 * Uses styling from "App.less"
 */
const App = (props) => {
  const _loadUser = props.loadUser;
  const _loadCourses = props.loadCourses;

  useEffect(() => {
    async function loadData() {
      await _loadUser();
      await _loadCourses();
    }

    if (localStorage.getItem("token")) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_loadUser, _loadCourses]);

  return (
    <div className="App">
      <LoadingScreen loading={props.pageLoading}>
        <BrowserRouter>
          <Switch>
            <Route
              render={() => {
                return props.isAuthenticated ? (
                  <SignedInRoutes courses={props.courses} />
                ) : (
                  <SignedOutRoutes />
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </LoadingScreen>
    </div>
  );
};

const { loadUser } = authActions;
const { loadCourses } = coursesActions;
const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    pageLoading: selectors.getPageLoading(state),
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps, { loadUser, loadCourses })(App);
