import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "../redux/auth/actionCreators";
import sortedCourses from "../redux/sorted-courses/actionCreators";
import courses from "../redux/courses/";
import * as status from "../redux/status/actionCreators";
import * as currentCourse from "../redux/current-course/actionCreators";

import reducers from "./";
import ReduxThunk from "redux-thunk";

export const middleware = [ReduxThunk];
const actionCreators = {
  ...auth,
  ...sortedCourses,
  ...courses,
  ...status,
  ...currentCourse,
};

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
