import API from "../../api/API";
import fetches from "./fetches";
import util from "../../util";
import {
  startLoading,
  stopLoading,
  clearError,
  setError,
} from "../status/actionCreators";
import selectors from "../selectors";

const { fetchSession } = fetches;
const { select, setMeetingURL } = util;

/**
 * Opens a new session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} session - session object with start and end time
 * @param {*} meetingURL
 */
const openSession = (session, meetingURL) => async (dispatch, getState) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());
  try {
    await Promise.all([
      API.openSession(courseID, session),
      setMeetingURL(meetingURL),
    ]);
    await dispatch(fetchSession());
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
const closeSession = () => async (dispatch, getState) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());

  try {
    await API.closeSession(courseID);
    await dispatch(fetchSession());
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
const joinSession = () => async (dispatch, getState) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());

  try {
    await API.joinSessionAsStaffer(courseID);
    await dispatch(fetchSession());
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
const leaveSession = () => async (dispatch, getState) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());
  const userID = selectors.getUserID(getState());

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
const editSession = (changes, meetingURL) => async (dispatch, getState) => {
  const user = selectors.getUser(getState());
  const courseID = selectors.getCourseID(getState());

  dispatch(startLoading());
  try {
    if (meetingURL) {
      await setMeetingURL(meetingURL);
    }
    await API.editSession(courseID, changes);
    await dispatch(fetchSession(courseID, user._id));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("editing this session"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Make an announcement in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} userName - user's name
 * @param {*} message
 */
const makeAnnouncement = (message) => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  const user = selectors.getUser(getState());

  dispatch(startLoading());

  try {
    await API.makeAnnouncement(courseID, message, user.name);
    await dispatch(fetchSession());
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
const pinAnnouncement = (announcementID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.pinAnnouncement(announcementID);
    await dispatch(fetchSession());
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
const unpinAnnouncement = (announcementID) => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    await API.unpinAnnouncement(announcementID);
    await dispatch(fetchSession());
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
const closeAnnouncement = (announcementID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.unpinAnnouncement(announcementID);
    await API.closeAnnouncement(announcementID);
    await dispatch(fetchSession());
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
const helpStudent = (questionID, assistant) => async (dispatch) => {
  dispatch(startLoading());

  try {
    // THIS MIGHT NOT BE RIGHT, THIS SHOULD REALLY BE HANDLED IN THE BACKEND
    await API.patchQuestion(questionID, { assistant });
    await dispatch(fetchSession());
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
const finishHelpingStudent = () => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    const activeQuestion = selectors.getActiveQuestion(getState());
    if (!activeQuestion) {
      return;
    }
    await API.patchQuestion(activeQuestion._id, {
      active: false,
      assistant: {
        ...activeQuestion.assistant,
        description: {
          ...activeQuestion.assistant.description,
          endedAt: new Date(),
        },
      },
    });
    await dispatch(fetchSession());
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
