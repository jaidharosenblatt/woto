import {
  startPageLoading,
  stopPageLoading,
  setError,
  setCustomError,
} from "../status/actionCreators";
import {
  LOGIN_USER,
  LOAD_USER,
  REGISTER_USER,
  EDIT_USER,
  LOGOUT_USER,
} from "./actionTypes";
import API from "../../api/API";

/**
 * Returns Redux Thunk function that dispatches LOAD_USER action with user
 * @function loadUser
 * @returns {function} Redux thunk action
 */
const loadUser = () => async (dispatch) => {
  dispatch(startPageLoading());
  try {
    const user = await API.loadUser();

    if (user != null) {
      dispatch({
        type: LOAD_USER,
        payload: user,
      });
    }
  } catch (error) {
    dispatch(setError("loading your profile"));
    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopPageLoading());
};

/**
 * Login a user
 * @param {Object} user email and password
 * @param {*} userType student or instructor
 * @returns {function} Redux thunk action
 */
const login = (user, userType) => async (dispatch) => {
  dispatch(startPageLoading());
  try {
    const loggedInUser = await API.logIn(user, userType);

    if (loggedInUser != null) {
      dispatch({
        type: LOGIN_USER,
        payload: { user, userType },
      });
    }
  } catch (error) {
    dispatch(
      setCustomError("You have entered an invalid username or password")
    );
    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopPageLoading());
};

/**
 * Sign up a new user
 * @param {Object} user registration form fields
 * @param {*} userType student or instructor
 * @returns {function} Redux thunk action
 */
const register = (user, userType) => async (dispatch) => {
  dispatch(startPageLoading());
  try {
    const newUser = await API.register(user, userType);

    if (newUser != null) {
      dispatch({
        type: REGISTER_USER,
        payload: { user, userType },
      });
    }
  } catch (error) {
    dispatch(
      setCustomError("Sorry, an account already exists under this email")
    );
    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopPageLoading());
};

/**
 * Edit profile for signed in user
 * @param {Object} user registration form fields
 * @param {*} userType student or instructor
 * @returns {function} Redux thunk action
 */
const editProfile = (changes) => async (dispatch) => {
  dispatch(startPageLoading());
  try {
    const newUser = await API.editProfile(changes);

    if (newUser != null) {
      dispatch({
        type: EDIT_USER,
        payload: newUser,
      });
    }
  } catch (error) {
    dispatch(setError("editing your profile"));

    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopPageLoading());
};

/**
 * Sign out the signed in user
 * @returns {function} Redux thunk action
 */
const logout = (user, userType) => async (dispatch) => {};

export default {
  loadUser,
  login,
  register,
  editProfile,
  logout,
};
