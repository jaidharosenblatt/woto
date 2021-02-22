import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { loadUser } from "../redux/auth/actionCreators";
import { loadCourses } from "../redux/courses/actions/student";
import { Notifications } from "react-push-notification";

import {
  pollDiscussions,
  pollQuestions,
} from "../redux/courses/actions/fetches";
import { stopPageLoading } from "../redux/status/actionCreators";
import selectors from "../redux/selectors";

import LoadingScreen from "./util-components/spinner/LoadingScreen";
import SignedOutRoutes from "./layout/SignedOutRoutes";
import Container from "./layout/signed-in-content/Container";
import GlobalModals from "./modals/redux/ReduxModals";
import GlobalAlerts from "./layout/GlobalAlerts";

import "./App.less";
import { getToken } from "../api/tokenService";
import { useInterval } from "../util/useInterval";
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
  const courseLength = props.courses.length;

  // Polling for session updates every 30 seconds
  useInterval(() => {
    props.pollDiscussions();
  }, 30000);

  // Polling for question updates every 5 seconds
  useInterval(() => {
    props.pollQuestions();
  }, 10000);

  useEffect(() => {
    async function loadData() {
      if (isVerified) {
        await _loadCourses();
      }
      await _loadUser();
    }

    if (getToken() && courseLength === 0) {
      loadData();
    } else {
      _stopPageLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_loadUser, _loadCourses, _stopPageLoading, isVerified]);

  return (
    <div className="App">
      <Notifications />
      <BrowserRouter>
        <LoadingScreen loading={props.pageLoading}>
          <GlobalModals>
            <GlobalAlerts>
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
            </GlobalAlerts>
          </GlobalModals>
        </LoadingScreen>
      </BrowserRouter>
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
  pollQuestions,
  pollDiscussions,
})(App);
