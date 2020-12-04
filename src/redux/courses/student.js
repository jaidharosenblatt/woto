import API from "../../api/API";
import fetches from "./fetches";
import selectors from "../selectors";
import util from "../../util";
import {
  startPageLoading,
  stopPageLoading,
  startLoading,
  stopLoading,
  clearError,
  setError,
} from "../status/actionCreators";
import actionCreators from "./actionCreators";
import auth from "../auth/actionCreators";

const { fetchSession, fetchDiscussions, fetchCourses } = fetches;
const { editProfile } = auth;
/**
 * Loads all courses into cache
 * @param {[]} courseIDs
 * @param {*} userID
 */
const loadCourses = () => async (dispatch) => {
  dispatch(startPageLoading());

  await dispatch(fetchCourses());

  dispatch(stopPageLoading());
};

const loadQuestionSession = () => async (dispatch) => {
  // await dispatch(fetchSession());
  // console.log("end of load question session");
};

/**
 * Join the queue in a session
 */
const joinQueue = () => async (dispatch, getState) => {
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
const leaveQueue = () => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    // Get question to set as inactive if user is in a session's queue
    const activeQuestion = selectors.getActiveQuestion(getState());
    // Set the question as inactive
    if (activeQuestion) {
      await API.patchQuestion(activeQuestion._id, {
        active: false,
      });

      // Fetch new session info
      await dispatch(fetchSession());
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
const submitQuestion = (questionDescription) => async (dispatch, getState) => {
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
const editSubmission = (description) => async (dispatch, getState) => {
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

/**
 * Load the discussions for a given course into cache
 * @param {*} courseID
 * @param {*} userID
 */
const loadDiscussions = () => async (dispatch) => {
  dispatch(startLoading());

  await dispatch(fetchDiscussions());

  dispatch(stopLoading());
};

/**
 * Post a discussion to a given course
 * @param {*} courseID
 * @param {*} userID
 * @param {*} description
 */
const postDiscussion = (description, meetingURL) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());

  try {
    await API.postDiscussion(courseID, { description });

    if (meetingURL) {
      await dispatch(editProfile({ meetingURL }));
    }

    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("posting your Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Close/archive a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
const closeDiscussion = (discussionID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.editDiscussion(discussionID, { archived: true });
    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("closing your Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Add user as a participant to a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
const joinDiscussion = (discussionID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.joinDiscussion(discussionID);
    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("joining this Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Remove user from a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
const leaveDiscussion = (discussionID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.leaveDiscussion(discussionID);
    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("leaving this Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

const setBypassSession = () => (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  dispatch(actionCreators.setBypassSession(courseID));
};

// // ***TODO***
// export const markAway = async (state, dispatch, user) => {
//     dispatch({ type: actions.SET_LOADING });
//     const temp = state.discussion.participants.map((item) => {
//         if (item.participant === user.participant) {
//             return { ...item, active: false };
//         }
//         return item;
//     });
//     console.log(temp);

//     try {
//         const response = await API.editDiscussion(state.discussion._id, {
//             participants: temp,
//         });
//         await setDiscussions(state, dispatch);
//         dispatch({ type: actions.SET_DISCUSSION, payload: response });
//     } catch (error) {
//         console.error(error.response ? error.response.data.message : error);
//     }
// };

const joinTAVideoLink = (courseID, userID, discussionID) => async (
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

export default {
  loadCourses,
  loadQuestionSession,
  joinQueue,
  leaveQueue,
  submitQuestion,
  editSubmission,
  loadDiscussions,
  postDiscussion,
  closeDiscussion,
  joinDiscussion,
  leaveDiscussion,
  joinTAVideoLink,
  setBypassSession,
};
