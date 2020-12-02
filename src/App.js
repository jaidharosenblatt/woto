import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import authActions from "./redux/auth/actionCreators";
import coursesActions from "./redux/courses/";
import selectors from "./redux/selectors";

import API from "./api/API";
import { AuthContext, actions } from "./contexts/AuthContext";
import { ContextProvider } from "./contexts/AuthContext";

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
  const { state, dispatch } = useContext(AuthContext);

  const _loadUser = props.loadUser;
  const _loadCourses = props.loadCourses;

  useEffect(() => {
    async function loadData() {
      await _loadUser();
      await _loadCourses();

      try {
        const user = await API.loadUser();
        if (user != null) {
          dispatch({
            type: actions.LOAD,
            payload: { user },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: actions.LOGOUT });
      }
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
                  <SignedInRoutes courses={props.courses} state={state} />
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

const UnconnectedApp = (props) => (
  <ContextProvider>
    <App {...props} />
  </ContextProvider>
);

const { loadUser } = authActions;
const { loadCourses } = coursesActions;
const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    pageLoading: selectors.getPageLoading(state),
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps, { loadUser, loadCourses })(
  UnconnectedApp
);
