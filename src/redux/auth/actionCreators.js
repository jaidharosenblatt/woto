import {
  setError,
  clearError,
  startLoading,
  stopLoading,
  setSuccessMessage,
  startPageLoading,
  stopPageLoading,
  resetStatus,
  setFadingError,
} from "../status/actionCreators";
import { resetCourses } from "../courses/actions/actionCreators";
import { resetSortedCourses } from "../sorted-courses/actionCreators";
import { resetCurrentCourse } from "../current-course/actionCreators";
import { loadCourses } from "../courses/actions/student";
import actionTypes from "./actionTypes";
import API from "../../api/API";
import selectors from "../selectors";
import { getToken } from "../../api/tokenService";

/**
 * Returns Redux Thunk function that dispatches LOAD_USER action with user
 * @function loadUser
 * @returns {function} Redux thunk action
 */
export const loadUser = () => async (dispatch) => {
  dispatch(startPageLoading());
  try {
    const user = await API.loadUser();

    if (user != null) {
      dispatch({
        type: actionTypes.LOAD_USER,
        payload: user,
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("loading your profile"));
    console.error(error);
    dispatch(resetAllStates());
  } finally {
    dispatch(stopPageLoading());
  }
};

/**
 * Login a user
 * @param {Object} user email and password
 * @param {String} userType student or instructor
 * @returns {function} Redux thunk action
 */
export const login = (user, userType) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const res = await API.logIn(user, userType);
    const loggedInUser = res[userType];

    if (getToken() && loggedInUser.verified) {
      await dispatch(loadCourses());
    }

    if (loggedInUser != null) {
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: { user: loggedInUser, userType },
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setFadingError(error));
  } finally {
    dispatch(stopLoading());
    dispatch(stopPageLoading());
  }
};

/**
 * Sign up a new user
 * @param {Object} user registration form fields
 * @param {String} userType student or instructor
 * @returns {function} Redux thunk action
 */
export const register = (user, userType) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const newUser = await API.register(user, userType);

    if (newUser != null) {
      dispatch({
        type: actionTypes.REGISTER_USER,
        payload: { user: newUser, userType },
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setFadingError(error));
  } finally {
    dispatch(stopLoading());
    dispatch(stopPageLoading());
  }
};

/**
 * Edit profile for signed in user
 * @param {Object} changes edit form fields
 * @returns {function} Redux thunk action
 */
export const editProfile = (changes, loading = true) => async (dispatch) => {
  loading && dispatch(startLoading());
  try {
    const newUser = await API.editProfile(changes);

    if (newUser != null) {
      dispatch({
        type: actionTypes.EDIT_USER,
        payload: newUser,
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setFadingError(error));
  }

  loading && dispatch(stopLoading());
};

/**
 * Sign out the signed in user
 * @returns {function} Redux thunk action
 */
export const logout = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    await API.logOut();
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(resetAllStates());
  }
};

/**
 * Send reverification email
 * @param {Object} values
 * @returns {function} Redux thunk action
 */
export const reverifyEmail = (email) => async (dispatch, getState) => {
  dispatch(startLoading());
  const userType = selectors.getUserType(getState());
  try {
    await API.reverify({ email }, userType);
    dispatch(setSuccessMessage(`Reverification email sent to ${email}`));
    dispatch(clearError());
  } catch (error) {
    dispatch(setFadingError(error));
  }
  dispatch(stopLoading());
};

/**
 * Send reverification email
 * @param {Object} values
 * @returns {function} Redux thunk action
 */
export const verifyUser = (verificationKey, userType) => async (dispatch) => {
  dispatch(startPageLoading());
  try {
    const res = await API.verifyUser(verificationKey, userType);
    const user = res[userType];

    if (user != null) {
      dispatch({
        type: actionTypes.LOAD_USER,
        payload: user,
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setFadingError(error));
  }
  dispatch(stopPageLoading());
};

/**
 * Call the Oauth API and dispatch the user (new or existing)
 * @param {String} code from oauth callback
 * @param {String} type either 'instructor' or 'student' (Default)
 * @returns {function} Redux thunk action
 */
export const authenticateWithOauth = (code, userType) => async (dispatch) => {
  try {
    let user;
    if (userType === "instructor") {
      user = await API.authenticateInstructor(code);
    } else {
      user = await API.authenticateStudent(code);
    }
    dispatch({
      type: actionTypes.LOAD_USER,
      payload: user,
    });
  } catch (error) {
    dispatch(setFadingError(error));
  }
};

/**
 * Reset all of redux states (courses, auth, sortedCourses, selectedCourse)
 */
const resetAllStates = () => (dispatch) => {
  dispatch(resetStatus());
  dispatch(resetCourses());
  dispatch(resetAuth());
  dispatch(resetSortedCourses());
  dispatch(resetCurrentCourse());
};

/**
 * Reset the auth state in redux
 * @returns {Object} to dispatch to redux
 */
export function resetAuth() {
  return {
    type: actionTypes.RESET,
  };
}
