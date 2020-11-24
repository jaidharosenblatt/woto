import _ from "lodash";
import API from "../api/API";
import { getStudentStats, getTAStats } from "../pages/tahelp/util/stats";

// Action types
const LOADING_SET = "woto/courses/LOADING_SET";
const ERROR_SET = "woto/courses/ERROR_SET";
const BYPASS_SESSION_SET = "woto/courses/BYPASS_SESSION_SET";
const COURSE_FETCH = "woto/courses/COURSE_FETCH";
const SESSION_FETCH = "woto/courses/SESSION_FETCH";
const DISCUSSIONS_FETCH = "woto/courses/DISCUSSIONS_FETCH";
const ACTIVE_DISCUSSION_FETCH = "woto/courses/ACTIVE_DISCUSSION_FETCH";
const QUESTIONS_FETCH = "woto/courses/QUESTIONS_FETCH";

// Reducer
export default (state = { loading: false, error: {} }, action) => {
  switch (action.type) {
    case LOADING_SET: // action.payload is boolean
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_SET: // action.payload is error message
      return {
        ...state,
        error: action.payload,
      };
    case BYPASS_SESSION_SET: {
      let newState = { ...state };
      newState[action.payload.courseID].bypassSession =
        action.payload.bypassSession;
      return newState;
    }
    case COURSE_FETCH: {
      // action.payload is course
      let newState = { ...state };
      if (action.payload?._id) {
        newState[action.payload._id] = action.payload;
      }
      return newState;
    }
    case SESSION_FETCH: {
      // action.payload is session
      let newState = { ...state };
      if (action.payload.courseID) {
        newState[action.payload.courseID] = {
          ...newState[action.payload.courseID],
          session: action.payload.session,
        };
      }
      return newState;
    }
    case DISCUSSIONS_FETCH: {
      // action.payload has attributes discussions and courseID
      let newState = { ...state };
      if (action.payload.courseID) {
        newState[action.payload.courseID] = {
          ...newState[action.payload.courseID],
          discussions: action.payload.discussions,
        };
      }
      return newState;
    }
    case ACTIVE_DISCUSSION_FETCH: {
      // action.payload has attributes activeDiscussion and courseID
      let newState = { ...state };
      if (action.payload.courseID) {
        newState[action.payload.courseID] = {
          ...newState[action.payload.courseID],
          activeDiscussion: action.payload.activeDiscussion,
        };
      }
      return newState;
    }
    case QUESTIONS_FETCH: {
      // action.payload has attributes courseID and questions[]
      let newState = { ...state };
      if (action.payload.courseID) {
        if (newState[action.payload.courseID]?.session) {
          newState[action.payload.courseID].session = {
            ...newState[action.payload.courseID].session,
            questions: action.payload.questions,
          };
        }
      }
      return newState;
    }
    default:
      return state;
  }
};

// Action Creators
// --------------------------FETCHERS AND HELPERS----------------------------------
/**
 * Fetch the active session for the given course if there is one
 * @param {*} courseID
 * @param {*} userID
 */
export const fetchSession = (courseID, userID) => async (
  dispatch,
  getState
) => {
  try {
    const sessions = await API.getSession(courseID);

    // Do nothing if there are no active sessions
    if (!sessions[0]?.active) {
      dispatch({
        type: SESSION_FETCH,
        payload: {
          session: null,
          courseID,
        },
      });
      dispatch({
        type: ERROR_SET,
        payload: {},
      });
      return;
    }

    let activeQuestion = null;
    let stats = null;

    // if user is student of the course (not a TA or instructor)
    if (
      !(
        userCourseAssistant(getState().courses[courseID], userID) ||
        getState().courses[courseID].owner === userID
      )
    ) {
      // If there is an active session, retrieve all relevant information
      const questions = await API.getMyQuestion(courseID);
      stats = getStudentStats(userID, questions);

      // Confirm question belongs to user
      const filtered = questions.filter((item) => item.student === userID);

      activeQuestion = filtered && filtered.length > 0 ? filtered[0] : null;
    }

    if (!activeQuestion && userStafferOf(sessions[0], userID)) {
      const allQuestions = await API.getQuestions(sessions[0]._id);

      const question = userAssistantOf(allQuestions, userID);
      stats = getTAStats(userID, allQuestions);

      activeQuestion = question ? question : activeQuestion;
    }

    dispatch({
      type: SESSION_FETCH,
      payload: {
        session: { ...sessions[0], stats, activeQuestion },
        courseID,
      },
    });

    if (userStafferOf(sessions[0], userID)) {
      await dispatch(fetchQuestions(courseID, sessions[0]._id));
    }

    dispatch({
      type: ERROR_SET,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  }
};

export const fetchQuestions = (courseID, sessionID) => async (dispatch) => {
  try {
    const questions = await API.getQuestions(sessionID);

    if (questions) {
      dispatch({
        type: QUESTIONS_FETCH,
        payload: {
          courseID,
          questions,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  }
};

/**
 * Fetch the discussions for a given course as well as the user's active discussion
 * @param {*} courseID
 */
export const fetchDiscussions = (courseID, userID) => async (dispatch) => {
  try {
    const discussions = await API.getDiscussions(courseID);

    // If there are any discussions

    dispatch({
      type: DISCUSSIONS_FETCH,
      payload: {
        discussions,
        courseID,
      },
    });

    const activeDiscussion = userParticipantOf(discussions, userID);

    dispatch({
      type: ACTIVE_DISCUSSION_FETCH,
      payload: {
        activeDiscussion,
        courseID,
      },
    });

    dispatch({
      type: ERROR_SET,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  }
};

/**
 * Fetch all information for a given course, memoized so we can call this whenever user navigates to a
 * course's page without fear of time inefficiency.
 * @param {*} courseID
 * @param {*} userID
 */
const fetchCourse = (courseID, userID) => async (dispatch) =>
  _fetchCourse(courseID, userID, dispatch);
const _fetchCourse = _.memoize(async (courseID, userID, dispatch) => {
  try {
    const courses = await API.getCourses();
    const course = _.find(courses, { _id: courseID });
    if (course) {
      dispatch({
        type: COURSE_FETCH,
        payload: course,
      });
      await dispatch(fetchSession(courseID, userID));
      await dispatch(fetchDiscussions(courseID, userID));
    }
  } catch (error) {
    dispatch({
      type: ERROR_SET,
      payload: error.response ? error.response : error,
    });
    console.error(error.response ? error.response.data.message : error);
  }
});

/**
 * Fetch the information for all courses in the given array
 * @param {[]} courseIDs
 * @param {*} userID
 */
const fetchCourses = (courseIDs, userID) => async (dispatch) => {
  for (const courseID of courseIDs) {
    await dispatch(fetchCourse(courseID, userID));
  }
};

/**
 * Return a discussion if a user is a participant in it (can also mean that they own it)
 * @param {*} discussions
 * @param {*} userID
 */
export const userParticipantOf = (discussions, userID) => {
  const activeDiscussions = discussions.filter(
    (discussion) => discussion.archived === false
  );

  for (const discussion of activeDiscussions) {
    for (const participant of discussion.participants) {
      if (participant.participant === userID && participant.active === true) {
        return discussion;
      }
    }
  }

  return null;
};

const userAssistantOf = (questions, userID) => {
  const activeQuestions = questions.filter(
    (question) => question.active === true
  );

  for (const question of activeQuestions) {
    if (question?.assistant?.id === userID) {
      return question;
    }
  }
};

const userCourseAssistant = (course, userID) => {
  for (const assistant of course?.assistants) {
    if (assistant.assistant === userID) {
      return true;
    }
    return false;
  }
};

export const userStafferOf = (session, userID) => {
  for (const staffer of session?.staffers) {
    if (staffer?.id === userID) {
      return true;
    }
  }
  return false;
};

// ----------------------STUDENT FUNCTIONS----------------------
/**
 * Loads all courses into cache
 * @param {[]} courseIDs
 * @param {*} userID
 */
export const loadCourses = (courseIDs, userID) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchCourses(courseIDs, userID));

  dispatch({ type: LOADING_SET, payload: false });
};

/**
 * Loads one course into cache
 * @param {*} courseID
 * @param {*} userID
 */
export const loadCourse = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchCourse(courseID, userID));

  dispatch({ type: LOADING_SET, payload: false });
};

/**
 * When the user first loads a course and needs to retrieve information about a session to see if there is an active one or not
 * @param {*} courseID
 * @param {*} userID
 */
export const loadSession = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  await dispatch(fetchSession(courseID, userID));

  dispatch({ type: LOADING_SET, payload: false });
};

export const loadQuestionSession = (courseID, userID) => async (dispatch) => {
  await dispatch(fetchSession(courseID, userID));
  console.log("end of load question session");
};

/**
 * Join the queue in a session
 * @param {*} courseID
 * @param {*} userID
 */
export const joinQueue = (courseID, userID) => async (dispatch, getState) => {
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
export const leaveQueue = (courseID, userID) => async (dispatch, getState) => {
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
 * Update the user's meeting url
 * @param {*} meetingURL
 */
export const setMeetingURL = async (meetingURL) => {
  try {
    await API.editProfile({ meetingURL: meetingURL });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

/**
 * Submit a question for an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} questionID
 * @param {*} questionDescription
 */
export const submitQuestion = (courseID, userID, questionDescription) => async (
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
export const editSubmission = (courseID, userID, description) => async (
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
export const loadDiscussions = (courseID, userID) => async (dispatch) => {
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
export const postDiscussion = (
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
export const closeDiscussion = (courseID, userID, discussionID) => async (
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
export const closeAllDiscussions = (userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });
  try {
    const courses = await API.getCourses();

    for (const course of courses) {
      const discussions = API.getDiscussions(course._id);
      for (const discussion of discussions) {
        if (discussion.owner === userID) {
          await dispatch(
            closeDiscussion(course._id, userID, discussion._id, true)
          );
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
export const editDiscussion = (
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
export const joinDiscussion = (courseID, userID, discussionID) => async (
  dispatch
) => {
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
export const leaveDiscussion = (courseID, userID, discussionID) => async (
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

export const setBypassSession = (courseID, bypassSession) => (dispatch) => {
  dispatch({
    type: BYPASS_SESSION_SET,
    payload: {
      courseID,
      bypassSession,
    },
  });
};

/**
 * Get relevant information for the particular course
 * @param {*} courses - entire courses state
 * @param {*} courseID
 */
export const select = (courses, courseID) => {
  const course = courses[courseID];

  return {
    loading: courses?.loading,
    error: courses?.error,
    course,
    session: course?.session,
    activeQuestion: course?.session?.activeQuestion,
    discussions: course?.discussions ? course?.discussions : [],
    activeDiscussion: course?.activeDiscussion,
    stats: course?.session?.stats,
    bypassSession: course?.bypassSession,
    description: getDescription(course),
  };
};

// Get description from either question or discussion
const getDescription = (course) => {
  let description = {};
  if (course?.activeDiscussion) {
    description = course?.activeDiscussion?.description;
  }
  if (course?.session?.activeQuestion) {
    description = course?.session?.activeQuestion.description;
  }
  return description;
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

// // ***TODO***
// export const joinTAVideoLink = async (state, dispatch) => {
//     if (!state.question?.assistant?.description?.studentJoined) {
//         dispatch({ type: actions.SET_LOADING });
//         var temp = state.question.assistant.description;
//         temp = { ...temp, studentJoined: new Date() };

//         try {
//             const res = await API.patchQuestion(state.question._id, {
//                 assistant: { description: temp, id: state.question.assistant.id },
//             });

//             dispatch({ type: actions.SET_QUESTION, payload: res });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };

// // ---------------------------TA FUNCTIONS---------------------------
// add active session to state

/**
 * Opens a new session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} session - session object with start and end time
 * @param {*} meetingURL
 */
export const openSession = (courseID, userID, session, meetingURL) => async (
  dispatch
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await Promise.all([
      API.openSession(courseID, session),
      setMeetingURL(meetingURL),
    ]);
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
 * Closes an active session for the given courseID
 * @param {*} courseID
 * @param {*} userID
 */
export const closeSession = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.closeSession(courseID);
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
 * Join a session as a staffer
 * @param {*} courseID
 * @param {*} userID
 */
export const joinSession = (courseID, userID) => async (dispatch) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.joinSessionAsStaffer(courseID);
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
 * Leave the session as a staffer (does not close the session)
 * @param {*} courseID
 * @param {*} userID
 */
export const leaveSession = (courseID, userID) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    // THERE SHOULD JUST BE ONE API CALL FOR THIS
    const { session } = select(getState.courses(), courseID);
    const staffers = session.staffers.filter((item) => item.id !== userID);

    await API.editSession(courseID, { staffers: staffers });
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
 * Edit the active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} changes
 * @param {*} meetingURL
 */
export const editSession = (courseID, userID, changes, meetingURL) => async (
  dispatch
) => {
  dispatch({ type: LOADING_SET, payload: true });
  try {
    if (meetingURL) {
      await setMeetingURL(meetingURL);
    }
    await API.editSession(courseID, changes);
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
 * Make an announcment in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} userName - user's name
 * @param {*} message
 */
export const makeAnnouncement = (courseID, userID, userName, message) => async (
  dispatch
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.makeAnnouncement(courseID, message, userName);
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
 * Pin an announcement in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} announcementID
 */
export const pinAnnouncement = (courseID, userID, announcementID) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.pinAnnouncement(announcementID);
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
 * Unpin an announcement in an active session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} announcementID
 */
export const unpinAnnouncement = (courseID, userID, announcementID) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.unpinAnnouncement(announcementID);
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
 * Close an announcement for a given courseID's session
 * @param {*} courseID
 * @param {*} userID
 * @param {*} announcementID
 */
export const closeAnnouncement = (courseID, userID, announcementID) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    await API.unpinAnnouncement(announcementID);
    await API.closeAnnouncement(announcementID);
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
 * Receive the question id for the question the TA is going to help on
 * @param {*} courseID
 * @param {*} userID
 * @param {*} questionID
 * @param {*} assistant
 */
export const helpStudent = (courseID, userID, questionID, assistant) => async (
  dispatch
) => {
  dispatch({ type: LOADING_SET, payload: true });

  try {
    // THIS MIGHT NOT BE RIGHT, THIS SHOULD REALLY BE HANDLED IN THE BACKEND
    await API.patchQuestion(questionID, { assistant });
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
 * Receive the question id for the question the TA is going to help on
 * @param {*} courseID
 * @param {*} userID
 * @param {*} questionID
 * @param {*} assistant
 */
export const finishHelpingStudent = (courseID, userID, date) => async (
  dispatch,
  getState
) => {
  dispatch({ type: LOADING_SET, payload: true });

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
