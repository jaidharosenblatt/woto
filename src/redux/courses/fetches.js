import _ from "lodash";
import API from "../../api/API";
import { getStudentStats, getTAStats } from "../../pages/tahelp/util/stats";
import {
  ERROR_SET,
  COURSE_FETCH,
  SESSION_FETCH,
  DISCUSSIONS_FETCH,
  ACTIVE_DISCUSSION_FETCH,
  QUESTIONS_FETCH,
} from "./actions";
/**
 * Fetch the active session for the given course if there is one
 * @param {*} courseID
 * @param {*} userID
 */
const fetchSession = (courseID, userID) => async (dispatch, getState) => {
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
      const filtered = questions.filter(
        (item) => item.student === userID && item.active
      );

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

const fetchQuestions = (courseID, sessionID) => async (dispatch) => {
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
const fetchDiscussions = (courseID, userID) => async (dispatch) => {
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
const userParticipantOf = (discussions, userID) => {
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
  const activeQuestions = questions.filter((question) => question.active);

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

const userStafferOf = (session, userID) => {
  for (const staffer of session?.staffers) {
    if (staffer?.id === userID) {
      return true;
    }
  }
  return false;
};

export default {
  fetchSession,
  fetchQuestions,
  fetchDiscussions,
  fetchCourse,
  fetchCourses,
  userParticipantOf,
  userStafferOf,
};
