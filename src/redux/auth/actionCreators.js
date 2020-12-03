import {
  setError,
  setCustomError,
  clearError,
  startLoading,
  stopLoading,
  setSuccessMessage,
} from "../status/actionCreators";
import {
  LOGIN_USER,
  LOAD_USER,
  REGISTER_USER,
  EDIT_USER,
  LOGOUT_USER,
} from "./actionTypes";
import API from "../../api/API";
import selectors from "./selectors";

/**
 * Returns Redux Thunk function that dispatches LOAD_USER action with user
 * @function loadUser
 * @returns {function} Redux thunk action
 */
const loadUser = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const user = await API.loadUser();

    if (user != null) {
      dispatch({
        type: LOAD_USER,
        payload: user,
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("loading your profile"));
    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopLoading());
};

/**
 * Login a user
 * @param {Object} user email and password
 * @param {String} userType student or instructor
 * @returns {function} Redux thunk action
 */
const login = (user, userType) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const res = await API.logIn(user, userType);

    const loggedInUser = res[userType];
    console.log(loggedInUser);
    if (loggedInUser != null) {
      dispatch({
        type: LOGIN_USER,
        payload: { user: loggedInUser, userType },
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(
      setCustomError("You have entered an invalid username or password")
    );
    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopLoading());
};

/**
 * Sign up a new user
 * @param {Object} user registration form fields
 * @param {String} userType student or instructor
 * @returns {function} Redux thunk action
 */
const register = (user, userType) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const newUser = await API.register(user, userType);

    if (newUser != null) {
      dispatch({
        type: REGISTER_USER,
        payload: { user, userType },
      });
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(
      setCustomError("Sorry, an account already exists under this email")
    );
    console.error(error);
    dispatch({ type: LOGOUT_USER });
  }

  dispatch(stopLoading());
};

/**
 * Edit profile for signed in user
 * @param {Object} changes edit form fields
 * @returns {function} Redux thunk action
 */
const editProfile = (changes) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const newUser = await API.editProfile(changes);

    if (newUser != null) {
      dispatch({
        type: EDIT_USER,
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
const logout = () => async (dispatch) => {
  dispatch(startLoading());
  await API.logOut();
  dispatch({
    type: LOGOUT_USER,
  });
  dispatch(clearError());
  dispatch(stopLoading());
};

/**
 * Send reverification email
 * @param {Object} values
 * @returns {function} Redux thunk action
 */
const reverifyEmail = (email) => async (dispatch, getState) => {
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

export default {
  loadUser,
  login,
  register,
  editProfile,
  logout,
  reverifyEmail,
};
