import API from "../../../api/API";
import { actions } from "./actions";
import { actions as userActions } from "../../../contexts/AuthContext";

// add active session to state
async function setupSession(state, dispatch, authContext, course) {
  const response = await API.getSession(course._id);
  // get active session
  const session = response[0];

  // if user is already a staffer in the active session
  const joined = findActiveStaffer(session, authContext.state.user).length > 0;

  // set state to session if active
  if (session && session.active) {
    dispatch({
      type: actions.SETUP_SESSION,
      payload: { session: session, joined: joined },
    });
  } else {
    dispatch({ type: actions.STOP_LOADING });
  }
}

// Edit the meeting url of the user into db and context if meeting url is new
const patchMeetingUrl = async (state, dispatch, authContext, meetingURL) => {
  if (meetingURL !== authContext.state.user.meetingURL) {
    try {
      const response = await API.editProfile({ meetingURL: meetingURL });
      authContext.dispatch({
        type: userActions.EDIT,
        payload: { user: { ...response } },
      });

      dispatch({ type: actions.CLEAR_MESSAGE });
    } catch (e) {
      let error = e.response.data.message;
      console.error(error);
      dispatch({ type: actions.SET_ERROR, payload: error });
    }
  }
};

// Open a new session
const openSession = async (state, dispatch, auth, values) => {
  try {
    const [session] = await Promise.all([
      API.openSession(state.course._id, values),
      patchMeetingUrl(state, dispatch, auth, values.meetingURL),
    ]);

    dispatch({
      type: actions.JOIN_SESSION,
      payload: session,
    });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// Close a session
const closeSession = async (state, dispatch) => {
  try {
    await API.closeSession(state.course?._id);
    //leave
    dispatch({
      type: actions.CLOSE_SESSION,
      payload: false,
    });
  } catch (error) {
    console.error(error.response.data.message);
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// Return instance of this active staffer if it exists
function findActiveStaffer(session, user) {
  const included = session.staffers.filter(
    (item) => item.staffer?.assistant === user._id && item.staffer.active
  );
  return included;
}

// Join an existing session
const joinSession = async (state, dispatch, auth, values) => {
  if (values.meetingURL) {
    await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
  }

  // Check if staffer in session already as inactive and set them as active
  if (findActiveStaffer(state.session, auth.state.user)) {
    // Sign in that active user
    await signInOff(auth.state.user, state, true);
  } else {
    try {
      const session = API.joinSessionAsStaffer(state.course._id);
      if (session) {
        dispatch({
          type: actions.JOIN_SESSION,
          payload: session,
        });
      } else {
        dispatch({
          type: actions.SET_ERROR,
          payload: "Unable to join session. Please refresh the page",
        });
      }
    } catch (error) {
      dispatch({
        type: actions.SET_ERROR,
        payload: error.response.data.message,
      });
    }
  }
};

/**
 * Set the current user to inactive in the course array
 * @param {*} active active status to change to for current user
 */
const signInOff = async (user, state, active) => {
  //only make first instance of user active
  let found = false;
  const staffers = state.session.staffers.map((item) => {
    // modify specific staffer to match inputed active status
    if (item._id === user._id && !found) {
      found = true;
      return { staffer: { ...item.staffer, active: active }, _id: item._id };
    } // leave other staffers the same
    else {
      return item;
    }
  });

  let session = await API.editSession(state.course._id, { staffers: staffers });
  return session;
};

// const editSession = async (values) => {
//   const { meetingURL, ...changes } = values;

//   try {
//     if (meetingURL) {
//       await patchMeetingUrl(meetingURL);
//     }
//     const res = await API.editSession(course._id, changes);
//     setSession(res);
//   } catch (error) {
//     console.error(error);
//     setSucMessage("* Error occured in editing session* ");
//   }
//   setSucMessage("* Session Editted Succesfully *");
// };

// Set message as an error to state
function setErrorMessage(state, dispatch, message) {}

// Set message as a success to state
function setSuccessMessage(state, dispatch, message) {}

// clear error/success message
function clearMessage(state, dispatch, message) {}

// add self to question and set question to state
function helpStudent(state, dispatch, question) {}

export default {
  setupSession,
  openSession,
  closeSession,
  joinSession,
  setErrorMessage,
  setSuccessMessage,
  clearMessage,
  helpStudent,
};
