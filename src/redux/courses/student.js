import API from "../../api/API";
import fetches from "./fetches";
import selectors from "../selectors";
import util from "../../util";
import {
  startLoading,
  stopLoading,
  clearError,
  setError,
} from "../status/actionCreators";
import actionCreators from "./actionCreators";

const {
  fetchFullCourse,
  fetchSession,
  fetchDiscussions,
  fetchCourses,
} = fetches;

/**
 * Loads all courses into cache
 * @param {[]} courseIDs
 * @param {*} userID
 */
const loadCourses = () => async (dispatch) => {
  dispatch(startLoading());

  await dispatch(fetchCourses());

  dispatch(stopLoading());
};

const loadCourse = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(fetchFullCourse());
  dispatch(stopLoading());
};

/**
 * When the user first loads a course and needs to retrieve information about a session to see if there is an active one or not
 * @param {*} courseID
 * @param {*} userID
 */
const loadSession = (courseID, userID) => async (dispatch) => {
  dispatch(startLoading());

  await dispatch(fetchSession(courseID, userID));

  dispatch(stopLoading());
};

const loadQuestionSession = (courseID, userID) => async (dispatch) => {
  await dispatch(fetchSession(courseID, userID));
  console.log("end of load question session");
};

/**
 * Join the queue in a session
 * @param {*} courseID
 * @param {*} userID
 */
const joinQueue = (courseID, userID) => async (dispatch, getState) => {
  dispatch(startLoading());

  try {
    await API.postQuestion(courseID);

    await dispatch(fetchSession(courseID, userID));
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
 * @param {*} courseID
 * @param {*} userID
 */
const leaveQueue = (courseID, userID) => async (dispatch, getState) => {
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
      await dispatch(fetchSession(courseID, userID));
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
const submitQuestion = (courseID, userID, questionDescription) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    const course = selectors.getCourse(getState());
    await API.patchQuestion(course.session.activeQuestion._id, {
      description: questionDescription,
    });

    await dispatch(fetchSession(courseID, userID));
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
const editSubmission = (courseID, userID, description) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());

  try {
    // Edit the question
    const activeQuestion = selectors.getActiveQuestion(getState());
    const activeDiscussion = selectors.getActiveDiscussion(getState());

    if (activeQuestion) {
      await API.patchQuestion(activeQuestion._id, {
        description,
      });
      await dispatch(fetchSession(courseID, userID));
    }
    // Check if it's also a discussion description
    if (activeDiscussion) {
      if (activeDiscussion?.owner._id === userID) {
        await API.editDiscussion(activeDiscussion._id, {
          description,
        });
        await dispatch(fetchDiscussions(courseID, userID));
      }
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
const loadDiscussions = (courseID, userID) => async (dispatch) => {
  dispatch(startLoading());

  await dispatch(fetchDiscussions(courseID, userID));

  dispatch(stopLoading());
};

/**
 * Post a discussion to a given course
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionDescription
 */
const postDiscussion = (
  courseID,
  userID,
  discussionDescription,
  meetingURL
) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.postDiscussion(courseID, {
      description: discussionDescription,
    });

    if (meetingURL) {
      await util.setMeetingURL(meetingURL);
    }

    await dispatch(fetchDiscussions(courseID, userID));
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
const closeDiscussion = (courseID, userID, discussionID) => async (
  dispatch
) => {
  dispatch(startLoading());

  try {
    await API.editDiscussion(discussionID, { archived: true });
    await dispatch(fetchDiscussions(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("closing your Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Close/archive all active discussions for a given user
 * @param {*} userID
 */
const closeAllDiscussions = (userID) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const courses = await API.getCourses();

    for (const course of courses) {
      const discussions = API.getDiscussions(course._id);
      for (const discussion of discussions) {
        if (discussion.owner === userID) {
          await dispatch(closeDiscussion(course._id, userID, discussion._id));
        }
      }
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("closing your previous Woto Rooms"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Edit a user's discussion's description
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 * @param {*} newDescription
 */
const editDiscussion = (
  courseID,
  userID,
  discussionID,
  newDescription
) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.editDiscussion(discussionID, { description: newDescription });
    await dispatch(fetchDiscussions(courseID, userID));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("editing your Woto room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Add user as a partcipant to a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
const joinDiscussion = (courseID, userID, discussionID) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.joinDiscussion(discussionID);
    await dispatch(fetchDiscussions(courseID, userID));
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
const leaveDiscussion = (courseID, userID, discussionID) => async (
  dispatch
) => {
  dispatch(startLoading());

  try {
    await API.leaveDiscussion(discussionID);
    await dispatch(fetchDiscussions(courseID, userID));
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
  loadCourse,
  loadSession,
  loadQuestionSession,
  joinQueue,
  leaveQueue,
  submitQuestion,
  editSubmission,
  loadDiscussions,
  postDiscussion,
  closeDiscussion,
  closeAllDiscussions,
  editDiscussion,
  joinDiscussion,
  leaveDiscussion,
  joinTAVideoLink,
  setBypassSession,
};
