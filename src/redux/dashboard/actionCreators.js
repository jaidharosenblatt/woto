import API from "../../api/API";
import selectors from "../selectors";
import {
  setServerError,
  startLoading,
  stopLoading,
} from "../status/actionCreators";
import actionTypes from "./actionTypes";

export const loadHome = () => async (dispatch, getState) => {
  // const courseId = selectors.getCourseID(getState());
  const courseId = "600b2ea7dbf78f001787db80";

  const startDate = selectors.getDashboardStartDate(getState());
  const endDate = selectors.getDashboardEndDate(getState());
  const assistant = selectors.getAssistant(getState());

  if (!startDate || !endDate) return;
  try {
    dispatch(startLoading());
    const analytics = await API.loadDashboardHome(
      courseId,
      convertJsDateToFlaskDate(startDate),
      convertJsDateToFlaskDate(endDate),
      assistant
    );
    dispatch(setDashboardCourse(courseId));
    dispatch(setDashboardHome(analytics));
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setServerError("loading analytics for this course"));
  }
};

/**
 * Convert a moment date object to python format to be used in flask API call
 * @param {Moment} moment date
 * @returns {String} data formatted as Tue Jan 26 2021 15:19:01 GMT-0500
 */
function convertJsDateToFlaskDate(date) {
  const utc = date._d;
  const withoutTimeZone = utc.toString().split(" (")[0];
  return withoutTimeZone;
}

/**
 * Create a dispatch to set an active TA for the dashboard
 * @param {String} assistantId
 * @returns {Object} function to dispatch
 */
export const setDashboardAssistant = (assistantId) => {
  return {
    type: actionTypes.SET_ASSISTANT,
    payload: assistantId,
  };
};

/**
 * Create a dispatch to set the start date for displaying date in dashboard
 * @param {String} date in unix
 * @returns {Object} function to dispatch
 */
export const setDashboardStartDate = (date) => {
  return {
    type: actionTypes.SET_START_DATE,
    payload: date,
  };
};

/**
 * Create a dispatch to set the end date for displaying date in dashboard
 * @param {String} date in unix
 * @returns {Object} function to dispatch
 */
export const setDashboardEndDate = (date) => {
  return {
    type: actionTypes.SET_END_DATE,
    payload: date,
  };
};

/**
 * Create a dispatch to set the at a glance stats from the flask api
 * @param {Object} stats in unix
 * @returns {Object} function to dispatch
 */
export const setDashboardHome = (stats) => {
  return {
    type: actionTypes.SET_HOME,
    payload: stats,
  };
};

/**
 * Create a dispatch to set the course for the dashboard
 * @param {String} courseId for course being displayed
 * @returns {Object} function to dispatch
 */
export const setDashboardCourse = (courseId) => {
  return {
    type: actionTypes.SET_COURSE,
    payload: courseId,
  };
};
