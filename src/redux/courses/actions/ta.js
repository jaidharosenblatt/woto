import API from "../../../api/API";
import { fetchSession } from "./fetches";
import {
  startLoading,
  stopLoading,
  clearError,
  setError,
} from "../../status/actionCreators";
import { updateCourse } from "../../sorted-courses/actionCreators";
import { editProfile } from "../../auth/actionCreators";
import selectors from "../../selectors";
import actionCreators from "./actionCreators";

/**
 * Opens a new session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} session - session object with start and end time
 * @param {*} meetingURL
 */
export const openSession = (session, meetingURL) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());
  const course = selectors.getCourse(getState());
  const courseWithSession = { ...course, activeSession: true };
  try {
    await API.openSession(courseID, session);
    await dispatch(editProfile({ meetingURL }));
    await dispatch(fetchSession());
    dispatch(updateCourse(courseWithSession));
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
export const closeSession = () => async (dispatch, getState) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());
  const course = selectors.getCourse(getState());
  const courseWithNoSession = { ...course, activeSession: false };
  try {
    await API.closeSession(courseID);
    dispatch(actionCreators.clearSession());
    dispatch(updateCourse(courseWithNoSession));
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
export const joinSession = () => async (dispatch, getState) => {
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
export const leaveSession = () => async (dispatch, getState) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());
  const userID = selectors.getUserID(getState());
  const session = selectors.getSession(getState());

  try {
    // THERE SHOULD JUST BE ONE API CALL FOR THIS
    const staffers = session.staffers.filter((item) => item.id !== userID);

    await API.editSession(courseID, { staffers: staffers });
    dispatch(actionCreators.clearSession());
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
export const editSession = (changes, meetingURL) => async (
  dispatch,
  getState
) => {
  const user = selectors.getUser(getState());
  const courseID = selectors.getCourseID(getState());

  dispatch(startLoading());
  try {
    if (meetingURL) {
      await dispatch(editProfile({ meetingURL }));
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
export const makeAnnouncement = (message) => async (dispatch, getState) => {
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
export const pinAnnouncement = (announcementID) => async (dispatch) => {
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
export const unpinAnnouncement = (announcementID) => async (
  dispatch,
  getState
) => {
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
export const closeAnnouncement = (announcementID) => async (dispatch) => {
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
export const helpStudent = (questionID) => async (dispatch, getState) => {
  dispatch(startLoading());
  const assistant = createAssistant(getState);

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
export const finishHelpingStudent = () => async (dispatch, getState) => {
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

/**
 * Get tittle for a user
 * @param {Object} user
 * @returns {String} title
 */
function getTitle(user) {
  if (!user.graduationYear) {
    return "Instructor";
  }
  if (user.graduationYear === "Graduate Student") {
    return "Graduate Teaching Assistant";
  } else {
    return "Undergraduate Teaching Assistant";
  }
}

/**
 * Create assistant field (will be replaced with db call)
 * @param {Object} state redux
 * @returns {Object} assistant object to post onto a question
 */
function createAssistant(state) {
  const user = selectors.getUser(state);
  return {
    id: selectors.getUserID(state),
    description: {
      name: user.name.split(" ")[0],
      role: getTitle(user),
      notifiedAt: new Date(),
      meetingURL: selectors.getUserMeetingURL(state),
    },
  };
}
