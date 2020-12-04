import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import authActions from "./redux/auth/actionCreators";
import { loadCourses } from "./redux/courses/student";
import selectors from "./redux/selectors";

import LoadingScreen from "./components/spinner/LoadingScreen";
import SignedOutRoutes from "./layout/SignedOutRoutes";
import Container from "./layout/signed-in-content/Container";

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
      await _loadCourses();
      await _loadUser();
    }

    if (localStorage.getItem("token")) {
      loadData();
    }
  }, [_loadUser, _loadCourses]);

  return (
    <div className="App">
      <LoadingScreen loading={props.pageLoading}>
        <BrowserRouter>
          <Switch>
            <Route
              render={() => {
                return props.isAuthenticated ? (
                  <Container />
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
const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    pageLoading: selectors.getPageLoading(state),
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps, { loadUser, loadCourses })(App);
