import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { loadUser } from "../redux/auth/actionCreators";
import { loadCourses } from "../redux/courses/actions/student";
import { stopPageLoading } from "../redux/status/actionCreators";

import selectors from "../redux/selectors";

import LoadingScreen from "./util-components/spinner/LoadingScreen";
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
  const _stopPageLoading = props.stopPageLoading;
  const { isVerified } = props;

  useEffect(() => {
    async function loadData() {
      if (isVerified) {
        await _loadCourses();
      }
      await _loadUser();
    }

    if (localStorage.getItem("token")) {
      loadData();
    } else {
      _stopPageLoading();
    }
  }, [_loadUser, _loadCourses, _stopPageLoading, isVerified]);

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

const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    pageLoading: selectors.getPageLoading(state),
    isAuthenticated: selectors.getAuthenticationStatus(state),
    isVerified: selectors.getVerificationStatus(state),
  };
};

export default connect(mapStateToProps, {
  loadUser,
  loadCourses,
  stopPageLoading,
})(App);
