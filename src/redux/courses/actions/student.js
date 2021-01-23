import API from "../../../api/API";
import { fetchSession, fetchDiscussions, fetchCourses } from "./fetches";
import selectors from "../../selectors";
import {
  startPageLoading,
  stopPageLoading,
  startLoading,
  stopLoading,
  clearError,
  setServerError,
  clearModalKey,
  blockModal,
  setError,
  setCustomServerError,
} from "../../status/actionCreators";
import { setActiveQuestion } from "./actionCreators";

/**
 * Loads all courses into cache
 * @param {[]} courseIDs
 * @param {*} userID
 */
export const loadCourses = () => async (dispatch) => {
  dispatch(startPageLoading());

  await dispatch(fetchCourses());

  dispatch(stopPageLoading());
};

/**
 * Join the queue in a session
 */
export const joinQueue = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  dispatch(startLoading());

  try {
    await API.postQuestion(courseID);

    // fetch session (instead of just dispatching the new activeQuestion) to update stats as well
    await dispatch(fetchSession());
    dispatch(clearError());
  } catch (error) {
    dispatch(setError(error));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Leave the queue in a session
 */
export const leaveQueue = () => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    // Get question to set as inactive if user is in a session's queue
    const activeQuestion = selectors.getActiveQuestion(getState());
    const courseID = selectors.getCourseID(getState());

    // Set the question as inactive
    if (activeQuestion) {
      await API.closeQuestion(activeQuestion._id);

      // Clear active question
      dispatch(setActiveQuestion(courseID, null));
      dispatch(clearError());
    }
  } catch (error) {
    dispatch(setServerError("leaving the help queue"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Submit a question for an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} questionID
 * @param {*} questionDescription
 */
export const submitQuestion = (questionDescription) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    const activeQuestion = selectors.getActiveQuestion(getState());
    await API.patchQuestion(activeQuestion._id, {
      description: questionDescription,
    });

    await dispatch(fetchSession());
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("submitting your question"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Edit submissison, works for both questions and discussions
 * @param {*} courseID
 * @param {*} userID
 * @param {*} description
 */
export const editSubmission = (description) => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    // Edit the question
    const activeQuestion = selectors.getActiveQuestion(getState());
    const activeDiscussion = selectors.getActiveDiscussion(getState());
    const userID = selectors.getUserID(getState());

    if (activeQuestion) {
      await API.patchQuestion(activeQuestion._id, {
        description,
      });
      await dispatch(fetchSession());
    }
    // Check if it's also a discussion description
    if (activeDiscussion && activeDiscussion.owner?._id === userID) {
      await API.editDiscussion(activeDiscussion._id, {
        description,
      });
      await dispatch(fetchDiscussions());
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("editing your question"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

export const joinTAVideoLink = () => async (dispatch, getState) => {
  const activeQuestion = selectors.getActiveQuestion(getState());
  const courseID = selectors.getCourseID(getState());

  dispatch(clearModalKey());
  dispatch(startLoading());

  try {
    // Create a new assistant field with student joined TODO replace with endpoint
    const question = await API.joinTALink(activeQuestion._id)

    console.log(question);
    dispatch(setActiveQuestion(courseID, question));
    dispatch(blockModal());
    dispatch(clearError());
  } catch (error) {
    dispatch(setCustomServerError(error));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};
