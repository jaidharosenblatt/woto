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
    dispatch({ type: actions.CLOSE_SESSION });
  } catch (error) {
    console.error(error.response.data.message);
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// Return instance of this active staffer if it exists
function findActiveStaffer(session, user) {
  if (!session?.staffers || session?.staffers.length === 0) {
    return false;
  }
  const included = session.staffers.filter((item) => item?.id === user._id);
  return included;
}

// Join an existing session
const joinSession = async (state, dispatch, auth, values) => {
  if (values.meetingURL) {
    await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
  }
  console.log(state.course._id);

  try {
    const session = await API.joinSessionAsStaffer(state.course._id);
    console.log(session);
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
    console.log(error);
    dispatch({
      type: actions.SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// sign out of session without closing it
const signOff = async (state, dispatch, auth) => {
  const staffers = state.session.staffers.filter(
    (item) => item.id !== auth.state.user._id
  );

  let session = await API.editSession(state.course._id, { staffers: staffers });
  console.log(session);

  // dispatch({
  //   type: actions.LEAVE_SESSION,
  //   payload: session,
  // });
};

const closeAnnouncement = (state, dispatch, auth, announcement) => {
  const temp = state.session.announcements.filter(
    (item) => item._id !== announcement._id
  );

  editSession({
    announcements: temp,
  });
};

const pinAnnnouncement = async (state, dispatch, auth, announcement) => {
  try {
    const response = await API.editCourse(state.course._id, {
      pinnedAnnouncements: announcement,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const makeAnnouncement = (state, dispatch, auth, message) => {
  const change = {
    announcements: [
      {
        announcement: message,
        ownerId: auth?.state.user._id,
        ownerName: auth?.state.user.name,
      },
      ...state.session?.announcements,
    ],
  };
  editSession(change);
};

/**
 * edit a session's attributes with
 * @param {*} values edits to make
 */
const editSession = async (state, dispatch, auth, values) => {
  const { meetingURL, ...changes } = values;
  try {
    if (meetingURL) {
      await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
    }
    const session = await API.editSession(state.course._id, changes);
    dispatch({
      type: actions.EDIT_SESSION,
      payload: session,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: actions.SET_ERROR,
      payload: "Error occured in editing session",
    });
  }
  dispatch({
    type: actions.SET_SUCCESS,
    payload: "Error occured in editing session",
  });
};

// add self to question and set question to state
function helpStudent(state, dispatch, question) {}

export default {
  setupSession,
  openSession,
  closeSession,
  joinSession,
  signOff,
  editSession,
  closeAnnouncement,
  pinAnnnouncement,
  makeAnnouncement,
  helpStudent,
};
