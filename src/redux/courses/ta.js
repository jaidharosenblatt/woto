import API from "../../api/API";
import fetches from "./fetches";
import util from "../../util";
import {
  startLoading,
  stopLoading,
  clearError,
  setError,
} from "../status/actionCreators";

const { fetchSession } = fetches;
const { select, setMeetingURL } = util;

/**
 * Opens a new session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} session - session object with start and end time
 * @param {*} meetingURL
 */
const openSession = (courseID, userID, session, meetingURL) => async (
  dispatch
) => {
  dispatch(startLoading());

  try {
    await Promise.all([
      API.openSession(courseID, session),
      setMeetingURL(meetingURL),
    ]);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("opening this session"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Closes an active session for the given courseID
 * @param {*} courseID
 * @param {*} userID
 */
const closeSession = (courseID, userID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.closeSession(courseID);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("closing this session"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Join a session as a staffer
 * @param {*} courseID
 * @param {*} userID
 */
const joinSession = (courseID, userID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.joinSessionAsStaffer(courseID);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("joining this session"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Leave the session as a staffer (does not close the session)
 * @param {*} courseID
 * @param {*} userID
 */
const leaveSession = (courseID, userID) => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    // THERE SHOULD JUST BE ONE API CALL FOR THIS
    const { session } = select(getState.courses(), courseID);
    const staffers = session.staffers.filter((item) => item.id !== userID);

    await API.editSession(courseID, { staffers: staffers });
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("leaving this session"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Edit the active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} changes
 * @param {*} meetingURL
 */
const editSession = (courseID, userID, changes, meetingURL) => async (
  dispatch
) => {
  dispatch(startLoading());
  try {
    if (meetingURL) {
      await setMeetingURL(meetingURL);
    }
    await API.editSession(courseID, changes);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("editing this session"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Make an announcment in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} userName - user's name
 * @param {*} message
 */
const makeAnnouncement = (courseID, userID, userName, message) => async (
  dispatch
) => {
  dispatch(startLoading());

  try {
    await API.makeAnnouncement(courseID, message, userName);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("making this announcement"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Pin an announcement in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} announcementID
 */
const pinAnnouncement = (courseID, userID, announcementID) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    await API.pinAnnouncement(announcementID);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("pinning this announcement"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Unpin an announcement in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} announcementID
 */
const unpinAnnouncement = (courseID, userID, announcementID) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    await API.unpinAnnouncement(announcementID);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("unpinning this announcement"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Close an announcement for a given courseID's session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} announcementID
 */
const closeAnnouncement = (courseID, userID, announcementID) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    await API.unpinAnnouncement(announcementID);
    await API.closeAnnouncement(announcementID);
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("closing this announcement"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Receive the question id for the question the TA is going to help on
 * @param {*} courseID
 * @param {*} userID
 * @param {*} questionID
 * @param {*} assistant
 */
const helpStudent = (courseID, userID, questionID, assistant) => async (
  dispatch
) => {
  dispatch(startLoading());

  try {
    // THIS MIGHT NOT BE RIGHT, THIS SHOULD REALLY BE HANDLED IN THE BACKEND
    await API.patchQuestion(questionID, { assistant });
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("helping this student"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Receive the question id for the question the TA is going to help on
 * @param {*} courseID
 * @param {*} userID
 * @param {*} questionID
 * @param {*} assistant
 */
const finishHelpingStudent = (courseID, userID, date) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    const { session } = select(getState().courses, courseID);
    const activeQuestion = session.activeQuestion;
    if (!activeQuestion) {
      return;
    }
    await API.patchQuestion(activeQuestion._id, {
      active: false,
      assistant: {
        ...activeQuestion.assistant,
        description: {
          ...activeQuestion.assistant.description,
          endedAt: date,
        },
      },
    });
    await dispatch(fetchSession(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("ending this interaction"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

export default {
  openSession,
  closeSession,
  joinSession,
  helpStudent,
  leaveSession,
  editSession,
  makeAnnouncement,
  pinAnnouncement,
  unpinAnnouncement,
  closeAnnouncement,
  finishHelpingStudent,
};
