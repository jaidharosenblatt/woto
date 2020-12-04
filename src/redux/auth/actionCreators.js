import {
  setError,
  setCustomError,
  clearError,
  startLoading,
  stopLoading,
  setSuccessMessage,
  startPageLoading,
  stopPageLoading,
} from "../status/actionCreators";
import { loadCourses } from "../courses/actions/student";
import actionTypes from "./actionTypes";
import API from "../../api/API";
import selectors from "../selectors";
import { RESET } from "../globalActionTypes";

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
    dispatch(logout());
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
  dispatch(startPageLoading());
  try {
    const res = await API.logIn(user, userType);

    const loggedInUser = res[userType];
    if (loggedInUser != null) {
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: { user: loggedInUser, userType },
      });
    }
    await dispatch(loadCourses());

    dispatch(clearError());
  } catch (error) {
    dispatch(
      setCustomError("You have entered an invalid username or password")
    );
    console.error(error);
    dispatch(logout());
  } finally {
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
        payload: { user, userType },
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(
      setCustomError("Sorry, an account already exists under this email")
    );
    console.error(error);
    dispatch(logout());
  }

  dispatch(stopLoading());
};

/**
 * Edit profile for signed in user
 * @param {Object} changes edit form fields
 * @returns {function} Redux thunk action
 */
export const editProfile = (changes) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const newUser = await API.editProfile(changes);

    if (newUser != null) {
      dispatch({
        type: actionTypes.EDIT_USER,
        payload: newUser,
      });
    }
    dispatch(clearError());

    console.log(newUser);
  } catch (error) {
    dispatch(setError("editing your profile"));
    console.error(error);
  }

  dispatch(stopLoading());
};

/**
 * Sign out the signed in user
 * @returns {function} Redux thunk action
 */
export const logout = () => async (dispatch) => {
  dispatch(startLoading());
  await API.logOut();

  dispatch({ type: RESET });
  dispatch(clearError());
  dispatch(stopLoading());
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
    dispatch(setError("sending your reverification email"));
    console.error(error);
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
    dispatch(setError("verifying your account"));
    console.error(error);
  }
  dispatch(stopPageLoading());
};
