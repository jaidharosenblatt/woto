import {
  startPageLoading,
  stopPageLoading,
  setError,
} from "../status/actionCreators";
import {
  LOGIN_USER,
  LOAD_USER,
  REGISTER_USER,
  EDIT_USER,
  LOGOUT_USER,
} from "./actionTypes";

const loadUser = () => async (dispatch) => {
  dispatch(startPageLoading());

  try {
    const user = await API.loadUser();
    if (user != null) {
      console.log(user);
      dispatch({
        type: LOAD_USER,
        payload: { user },
      });
    }
  } catch (error) {
    dispatch(setError("loading your profile"));
    console.error(error);
    dispatch({ type: actions.LOGOUT });
  }

  dispatch(stopPageLoading());
};

export default {
  loadUser,
};
