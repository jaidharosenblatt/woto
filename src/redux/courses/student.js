import API from "../../api/API";
import { LOADING_SET, ERROR_SET, BYPASS_SESSION_SET } from "./actionsTypes";
import fetches from "./fetches";
import util from "./util";
const { fetchCourse, fetchSession, fetchDiscussions, fetchCourses } = fetches;
const { select, setMeetingURL } = util;
/**
 * Loads all courses into cache
 * @param {[]} courseIDs
 * @param {*} userID
 */
const loadCourses = (courseIDs, userID) => async (dispatch, getState) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchCourses(courseIDs, userID));

  dispatch({ type: LOADING_SET, payload: false });
};

/**
 * Loads one course into cache
 * @param {*} courseID
 * @param {*} userID
 */
const loadCourse = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchCourse(courseID, userID));

  dispatch({ type: LOADING_SET, payload: false });
};

/**
 * When the user first loads a course and needs to retrieve information about a session to see if there is an active one or not
 * @param {*} courseID
 * @param {*} userID
 */
const loadSession = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchSession(courseID, userID));

  dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.postQuestion(courseID);

    await dispatch(fetchSession(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
  }
};

/**
 * Leave the queue in a session
 * @param {*} courseID
 * @param {*} userID
 */
const leaveQueue = (courseID, userID) => async (dispatch, getState) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    // Get question to set as inactive if user is in a session's queue
    const { activeQuestion } = select(getState().courses, courseID);
    // Set the question as inactive
    if (activeQuestion) {
      await API.patchQuestion(activeQuestion._id, {
        active: false,
      });

      // Fetch new session info
      await dispatch(fetchSession(courseID, userID));
    }
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    const { course } = select(getState().courses, courseID);
    await API.patchQuestion(course.session.activeQuestion._id, {
      description: questionDescription,
    });

    await dispatch(fetchSession(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    // Edit the question
    const { activeQuestion, activeDiscussion } = select(
      getState().courses,
      courseID
    );
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
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
  }
};

/**
 * Load the discussions for a given course into cache
 * @param {*} courseID
 * @param {*} userID
 */
const loadDiscussions = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchDiscussions(courseID, userID));

  dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.postDiscussion(courseID, {
      description: discussionDescription,
    });

    if (meetingURL) {
      await setMeetingURL(meetingURL);
    }

    await dispatch(fetchDiscussions(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.editDiscussion(discussionID, { archived: true });
    await dispatch(fetchDiscussions(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
  }
};

/**
 * Close/archive all active discussions for a given user
 * @param {*} userID
 */
const closeAllDiscussions = (userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });
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
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.editDiscussion(discussionID, { description: newDescription });
    await dispatch(fetchDiscussions(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
  }
};

/**
 * Add user as a partcipant to a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
const joinDiscussion = (courseID, userID, discussionID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.joinDiscussion(discussionID);
    await dispatch(fetchDiscussions(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
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
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.leaveDiscussion(discussionID);
    await dispatch(fetchDiscussions(courseID, userID));
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  } finally {
    dispatch({ type: LOADING_SET, payload: false });
  }
};

const setBypassSession = (courseID, bypassSession) => (dispatch) => {
  dispatch({
    type: BYPASS_SESSION_SET,
    payload: {
      courseID,
      bypassSession,
    },
  });
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
  setMeetingURL,
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
