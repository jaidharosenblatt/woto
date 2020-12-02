import _ from "lodash";
import API from "../../api/API";
import { getStudentStats, getTAStats } from "../../util/stats";
import util from "../../util";
import actionCreators from "./actionCreators";
import { clearError, setError } from "../status/actionCreators";

import selectors from "../selectors";
/**
 * @function fetchCourses
 * Fetch the information for all courses in the given array
 * @returns {function} Redux thunk action
 */
const fetchCourses = () => async (dispatch) => {
  const courses = await API.getCourses();

  const sorted = sortCoursesBySessionThenCode(courses);
  dispatch(actionCreators.setSortedCourses(sorted));

  const activeCourses = courses.filter((item) => item.archived !== true);

  for (const course of activeCourses) {
    dispatch(actionCreators.setCourse(course._id, course));
  }
};

/**
 * @function fetchFullCourse
 * Fetch the full information for the currently selected course
 * @returns {function} Redux thunk action
 */
const fetchFullCourse = () => async (dispatch, getState) => {
  const course = selectors.getCourse(getState());
  const session = selectors.getSession(getState());
  const discussions = selectors.getDiscussions(getState());

  if (session && discussions.length !== 0) return; // used cached values if they exist

  if (course?.activeSession) {
    await dispatch(fetchSession());
  }
  await dispatch(fetchDiscussions());
};

/**
 * @function fetchSession
 * Fetch the active session for the given course if there is one
 * @returns {function} Redux thunk action
 */
const fetchSession = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());

  try {
    const sessions = await API.getSession(courseID);
    dispatch(actionCreators.setSession(courseID, sessions[0]));

    await dispatch(fetchQuestions(sessions[0]));
    dispatch(clearError());
  } catch (error) {
    dispatch(setError("loading the active session"));
    console.error(error);
  }
};

/**
 * @function fetchQuestions
 * Fetch the questions for an active session
 * @param {Object} session
 * @returns {function} Redux thunk action
 */
const fetchQuestions = (session) => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  const course = selectors.getCourse(getState());
  const userID = selectors.getUserID(getState());

  try {
    const questions = await API.getQuestions(session._id);
    dispatch(actionCreators.setQuestions(courseID, questions));

    if (questions) {
      dispatch(actionCreators.setQuestions(courseID, questions));
      let activeQuestion;
      if (userIsStudent(course)) {
        const myQuestions = await API.getMyQuestion(courseID);
        const stats = getStudentStats(userID, questions);
        dispatch(actionCreators.setStats(courseID, stats));
        activeQuestion = getMyQuestion(myQuestions, userID);
      } else {
        const stats = getTAStats(userID, questions);
        dispatch(actionCreators.setStats(courseID, stats));
      }
      dispatch(actionCreators.setActiveQuestion(courseID, activeQuestion));
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
const fetchDiscussions = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  const userID = selectors.getUserID(getState());

  try {
    const discussions = await API.getDiscussions(courseID);
    const description = selectors.getDescription(getState());

    if (discussions.length === 0) {
      return;
    }
    // Sort by description of user's Woto or question
    if (description && description.length !== 0) {
      util.sortDiscussionsByDescription(discussions, description);
    }
    dispatch(actionCreators.setDiscussions(courseID, discussions));

    const activeDiscussion = getMyDiscussion(discussions, userID);
    activeDiscussion &&
      dispatch(actionCreators.setActiveDiscussion(courseID, activeDiscussion));

    dispatch(clearError());
  } catch (error) {
    dispatch(setError("getting the Woto Rooms"));
    console.error(error);
  }
};

/**
 * @function userParticipantOf
 * Determine whether or not user is in any questions
 * @param {Array} questions
 * @param {String} userID
 * @returns {Object} the question user is helping
 */
const getMyQuestion = (questions, userID) => {
  // filter out inactive questions
  const filteredQuestions = questions.filter((item) => item.active);

  // As a student
  const myQuestions = filteredQuestions.filter(
    (item) => item.student === userID
  );
  if (myQuestions.length !== 0) {
    return myQuestions[0];
  }

  // As an assistant
  for (const question of filteredQuestions) {
    if (question?.assistant?.id === userID) {
      return question;
    }
  }
};

/**
 * @function getMyDiscussion
 * Determine whether or not user is in any active discussions
 * @param {Array} discussions
 * @param {String} userID
 * @returns {Object} the question user is helping
 */
const getMyDiscussion = (discussions, userID) => {
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
 * @function userIsStudent
 * @param {Object} course
 * @returns whether or not user is a student in course
 */
const userIsStudent = (course) => {
  return course.role === "Student";
};

/**
 * @function userStafferOf
 * Determine whether or not user is a TA (staffer) in a session
 * @returns {Boolean} user in staffers array
 */
const userStafferOf = () => async (dispatch, getState) => {
  const session = selectors.getSession(getState());
  const userID = selectors.getUserID(getState());
  if (!session?.staffers) {
    return false;
  }
  for (const staffer of session?.staffers) {
    if (staffer?.id === userID) {
      return true;
    }
  }
  return false;
};

const sortCoursesBySessionThenCode = (courses) => {
  courses.sort((a, b) => {
    if (
      (a.activeSession && b.activeSession) ||
      (!a.activeSession && !b.activeSession)
    ) {
      return b.code > a.code ? 1 : -1;
    } else if (a.activeSession) {
      return -1;
    } else {
      return 1;
    }
  });
  return courses.map((course) => {
    return {
      _id: course._id,
      code: course.code,
      activeSession: course.activeSession,
    };
  });
};

export default {
  fetchSession,
  fetchQuestions,
  fetchDiscussions,
  fetchFullCourse,
  fetchCourses,
  userStafferOf,
};
