import API from "../../../api/API";
import { actions } from "./actions";
import { actions as userActions } from "../../../contexts/AuthContext";

// add active session to state
async function setupSession(state, dispatch, course) {
  const response = await API.getSession(course._id);
  // get active session
  const session = response[0];
  // set state to session if active
  if (session && session.active) {
    dispatch({
      type: actions.SET_SESSION,
      payload: session,
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
      type: actions.SET_SESSION,
      payload: session,
    });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// // Close a session
// const closeSession = async () => {
//   try {
//     await API.closeSession(course._id);
//     setError(null);
//   } catch (error) {
//     console.error(error.response.data.message);
//     setError(error.response.data.message);
//   }
// };

// // Join an existing session
// const joinSession = async (values) => {
//   // Check if staffer in session already as inactive and set them as active
//   const included =
//     session.staffers.filter(
//       (item) => item.staffer.assistant === user._id && item.staffer.active
//     ).length > 0;
//   console.log(included);

//   if (included) {
//     // Sign in that active user
//     await signInOff(true);
//   } else {
//     try {
//       const [session] = await Promise.all([
//         API.joinSessionAsStaffer(course._id),
//         patchMeetingUrl(values.meetingURL),
//       ]);
//       if (session) {
//         setSession(session);
//       } else {
//         setError("Unable to join session. Please refresh the page");
//       }
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   }
// };

// /**
//  * Set the current user to inactive in the course array
//  * @param {*} active active status to change to for current user
//  */
// const signInOff = async (active) => {
//   //only make first instance of user active
//   let found = false;
//   const staffers = session.staffers.map((item) => {
//     if (item._id === user._id && !found) {
//       found = true;
//       return { staffer: { ...item.staffer, active: active }, _id: item._id };
//     } else {
//       return item;
//     }
//   });
//   try {
//     const res = await API.editSession(course._id, { staffers: staffers });
//     setSession(res);
//   } catch (error) {
//     console.error(error);
//   }
// };

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
  setErrorMessage,
  setSuccessMessage,
  clearMessage,
  helpStudent,
};
