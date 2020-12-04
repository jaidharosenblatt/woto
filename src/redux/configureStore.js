import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as auth from "./auth/actionCreators";
import sortedCourses from "./sorted-courses/actionCreators";
import * as studentCourses from "./courses/actions/student";
import * as wotoCourses from "./courses/actions/wotos";
import * as taCourses from "./courses/actions/ta";
import * as fetches from "./courses/actions/fetches";
import * as status from "./status/actionCreators";
import * as currentCourse from "./current-course/actionCreators";

import reducers from "./";
import ReduxThunk from "redux-thunk";

export const middleware = [ReduxThunk];
const actionCreators = {
  ...auth,
  ...sortedCourses,
  ...studentCourses,
  ...wotoCourses,
  ...taCourses,
  ...fetches,
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
