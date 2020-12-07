import API from "../../../api/API";
import {
  fetchSession,
  fetchDiscussions,
  fetchCourses,
  fetchQuestions,
} from "./fetches";
import selectors from "../../selectors";
import {
  startPageLoading,
  stopPageLoading,
  startLoading,
  stopLoading,
  clearError,
  setError,
} from "../../status/actionCreators";
import actionCreators from "./actionCreators";

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
 * Used for polling. Refreshes questions array into redux
 * @returns Redux thunk action
 */
export const loadQuestionSession = () => async (dispatch, getState) => {
  const session = selectors.getSession(getState());
  await dispatch(fetchQuestions(session));
  // console.log("polling question");
};

/**
 * Join the queue in a session
 */
export const joinQueue = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  dispatch(startLoading());

  try {
    await API.postQuestion(courseID);

    await dispatch(fetchSession());
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("joining the help queue"));
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
      await API.patchQuestion(activeQuestion._id, {
        active: false,
      });

      // Fetch new session info
      await dispatch(actionCreators.setActiveQuestion(courseID, null));
      dispatch(clearError());
    }
  } catch (error) {
    dispatch(setError("leaving the help queue"));
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
    dispatch(setError("submitting your question"));
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

export const joinTAVideoLink = (courseID, userID, discussionID) => async (
  dispatch
) => {
  // if (!state.question?.assistant?.description?.studentJoined) {
  //     dispatch({ type: actions.SET_LOADING });
  //     var temp = state.question.assistant.description;
  //     temp = { ...temp, studentJoined: new Date() };
  //     try {
  //         const res = await API.patchQuestion(state.question._id, {
  //             assistant: { description: temp, id: state.question.assistant.id },
  //         });
  //         dispatch({ type: actions.SET_QUESTION, payload: res });
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }
};
