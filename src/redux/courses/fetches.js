import _ from "lodash";
import API from "../../api/API";
import { getStudentStats, getTAStats } from "../../pages/tahelp/util/stats";
import util from "../../util";
import {
  COURSE_FETCH,
  SESSION_FETCH,
  DISCUSSIONS_FETCH,
  ACTIVE_DISCUSSION_FETCH,
  QUESTIONS_FETCH,
} from "./actionsTypes";
import { clearError, setError } from "../status/actionCreators";

import selectors from "../selectors";
/**
 * @function fetchSession
 * Fetch the active session for the given course if there is one
 * @returns {function} Redux thunk action
 */
const fetchSession = () => async (dispatch, getState) => {
  const course = selectors.getCourse(getState());
  const courseID = course._id;
  const userID = selectors.getUserID(getState());

  try {
    const sessions = await API.getSession(courseID);

    let activeQuestion = null;
    let stats = null;

    // if user is student of the course (not a TA or instructor)
    if (userIsStudent(course, userID)) {
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

    dispatch(clearError());

    if (userStafferOf(sessions[0], userID)) {
      await dispatch(fetchQuestions(courseID, sessions[0]._id));
    }
  } catch (error) {
    dispatch(setError("loading the active session"));
    console.error(error);
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
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("getting your question"));
    console.error(error);
  }
};

/**
 * Fetch the discussions for a given course as well as the user's active discussion
 * @param {*} courseID
 * @returns {function} Redux thunk action
 */
const fetchDiscussions = (courseID, userID) => async (dispatch, getState) => {
  try {
    const discussions = await API.getDiscussions(courseID);
    const description = selectors.getDescription(getState());

    if (discussions.length === 0) {
      return;
    }
    // Sort by description of user's woto or question
    if (description && description.length !== 0) {
      util.sortDiscussionsByDescription(discussions, description);
    }
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
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("getting your Woto Room"));
    console.error(error);
  }
};

/**
 * Fetch all information for a given course, memoized so we can call this whenever user navigates to a
 * course's page without fear of time inefficiency.
 * @param {String} courseID
 * @param {String} userID
 * @returns {function} Redux thunk action
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
      if (course.activeSession) {
        await dispatch(fetchSession());
      }
      await dispatch(fetchDiscussions(courseID, userID));
    }
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("getting this course information"));
    console.error(error);
  }
});

/**
 * @function fetchCourses
 * Fetch the information for all courses in the given array
 * @param {Array} courseIDs
 * @param {String} userID
 */
const fetchCourses = (courseIDs, userID) => async (dispatch) => {
  for (const courseID of courseIDs) {
    await dispatch(fetchCourse(courseID, userID));
  }
};

/**
 * @function userParticipantOf
 * Determine whether or not user is in any active discussions
 * @param {Array} discussions
 * @param {String} userID
 * @returns {Object} the question user is helping
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
};

/**
 * @function userAssistantOf
 * Determine whether or not user (TA) is helping any questions
 * @param {Array} questions
 * @param {String} userID
 * @returns {Object} the question user is helping
 */
const userAssistantOf = (questions, userID) => {
  const activeQuestions = questions.filter((question) => question.active);

  for (const question of activeQuestions) {
    if (question?.assistant?.id === userID) {
      return question;
    }
  }
};

/**
 * @function userCourseAssistant
 * Determine whether or not user is a assistant (TA) for a course
 * @param {Object} course
 * @param {String} userID
 * @returns {Boolean} user in assistant array
 */
const userCourseAssistant = (course, userID) => {
  for (const assistant of course?.assistants) {
    if (assistant.assistant === userID) {
      return true;
    }
    return false;
  }
};

/**
 * @function userStafferOf
 * Determine whether or not user is a TA (staffer) in a session
 * @param {Object} session
 * @param {String} userID
 * @returns {Boolean} user in staffers array
 */
const userStafferOf = (session, userID) => {
  for (const staffer of session?.staffers) {
    if (staffer?.id === userID) {
      return true;
    }
  }
  return false;
};

/**
 * @function userIsStudent
 * Determine whether or not user is a student in a course
 * @param {Object} course
 * @param {String} userID
 * @returns {Boolean} student or not
 */
const userIsStudent = (course, userID) => {
  return !userCourseAssistant(course, userID) && !course.owner === userID;
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
