import API from "../../../api/API";
import { getStudentStats, getTAStats } from "../../../util/stats";
import util from "../../../util";
import * as actionCreators from "./actionCreators";
import {
  clearError,
  setServerError,
  setModalKey,
} from "../../status/actionCreators";
import { setSortedCourses } from "../../sorted-courses/actionCreators";

import selectors from "../../selectors";
import { changeCourse } from "../../current-course/actionCreators";
import { modalTypes } from "../../../components/modals/redux/modalTypes";
import { getUserType } from "../../../api/tokenService";
/**
 * @function fetchCourses
 * Fetch the information for all courses in the given array
 * @returns {function} Redux thunk action
 */
export const fetchCourses = () => async (dispatch, getState) => {
  const courses = await API.getCourses();

  dispatch(setSortedCourses(courses));

  const activeCourses = courses.filter((item) => item.archived !== true);

  for (const course of activeCourses) {
    dispatch(actionCreators.setCourse(course._id, course));
  }

  // Set the selected course to the first one in sorted courses or from the url
  const selectedCourse = selectors.getCourseID(getState());
  const sorted = selectors.getSortedCourses(getState());
  const path = window.location.pathname.substr(1).split("/");
  const redirectCourse = path[0] === "courses" ? path[1] : sorted[0]?._id;

  if (!selectedCourse && sorted.length !== 0) {
    await dispatch(changeCourse(redirectCourse));
  }
};

/**
 * @function fetchFullCourse
 * Fetch the full information for the currently selected course
 * @returns {function} Redux thunk action
 */
export const fetchFullCourse = () => async (dispatch, getState) => {
  const course = selectors.getCourse(getState());
  const session = selectors.getSession(getState());

  if (!course) return; // don't load if there is no active course
  if (course.discussions && (session || !course.ActiveSession)) return; // used cached values if they exist

  if (course?.activeSession) {
    await dispatch(fetchSession());
  }
  await dispatch(fetchDiscussions());
};

/**
 * Used for polling. Refreshes questions array into redux
 * @returns Redux thunk action
 */
export const pollQuestions = () => async (dispatch, getState) => {
  const session = selectors.getSession(getState());
  if (session) {
    await dispatch(fetchQuestions(session));
  }
};

/**
 * Used for polling. Refreshes discussions array into redux
 * @returns Redux thunk action
 */
export const pollDiscussions = () => async (dispatch, getState) => {
  const course = selectors.getCourse(getState());
  if (course) {
    await dispatch(fetchDiscussions());
  }
};

/**
 * @function fetchSession
 * Fetch the active session for the given course if there is one
 * @returns {function} Redux thunk action
 */
export const fetchSession = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());

  try {
    const sessions = await API.getSession(courseID);

    await dispatch(fetchQuestions(sessions[0]));
    dispatch(actionCreators.setSession(courseID, sessions[0]));
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("loading the active session"));
    console.error(error);
  }
};

/**
 * @function fetchQuestions
 * Fetch the questions for an active session
 * @param {Object} session
 * @returns {function} Redux thunk action
 */
export const fetchQuestions = (session) => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  const course = selectors.getCourse(getState());
  const userID = selectors.getUserID(getState());

  try {
    const questions = await API.getQuestions(session._id);
    const stats = await API.getStats(session._id);
    dispatch(actionCreators.setStats(courseID, stats));

    if (questions) {
      dispatch(actionCreators.setQuestions(courseID, questions));
      let activeQuestion;
      if (userIsAssistantOrInstructor(course)) {
        // Check if user is helping any student
        activeQuestion = getMyHelpingQuestion(questions, userID);
      } else {
        // User is a student in this course
        // Get full attribute question from DB if it exists
        activeQuestion =
          studentHasQuestion(questions, userID) &&
          (await API.getMyQuestion(courseID));

        //get the most recent active help
        const activeHelp = activeQuestion.helps
          ?.filter((help) => help.active)
          .pop();

        // show a modal if the student has an assistant on their question
        if (activeHelp && !activeHelp.joinedAt) {
          dispatch(setModalKey(modalTypes.HELP_READY));
        }
      }
      dispatch(actionCreators.setActiveQuestion(courseID, activeQuestion));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetch the discussions for a given course as well as the user's active discussion
 * @param {*} courseID
 * @returns {function} Redux thunk action
 */
export const fetchDiscussions = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  const userID = selectors.getUserID(getState());

  try {
    const discussions = await API.getDiscussions(courseID);
    const description = selectors.getDescription(getState());

    // Sort by description of user's Woto or question
    if (description?.length !== 0) {
      util.sortDiscussionsByDescription(discussions, description);
    }
    dispatch(actionCreators.setDiscussions(courseID, discussions));

    const activeDiscussion = getMyDiscussion(discussions, userID);
    activeDiscussion &&
      dispatch(actionCreators.setActiveDiscussion(courseID, activeDiscussion));
  } catch (error) {
    console.error(error);
  }
};

/**
 * @function studentHasQuestion
 * Determine whether or not user has an active question
 * @param {Array} questions
 * @param {String} userID
 * @returns {Boolean} whether or not signed in user has a question
 */
const studentHasQuestion = (questions, userID) => {
  for (const item of questions) {
    if (item?.question?.student === userID) {
      return true;
    }
  }
  return false;
};

/**
 * @function getMyHelpingQuestion
 * Determine whether or not user is in any questions
 * @param {Array} questions
 * @param {String} userID
 * @returns {Object} the question user is helping
 */
const getMyHelpingQuestion = (questions, userID) => {
  // filter out inactive questions
  const filteredQuestions = questions.filter((item) => item.active);

  for (const question of filteredQuestions) {
    for (const help of question.helps) {
      if (help.assistant.id === userID) {
        return question;
      }
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
 * @function userIsAssistantOrInstructor
 * @param {Object} course
 * @returns whether or not user is TA or instructor in the course
 */
export const userIsAssistantOrInstructor = (course) => {
  return course.role === "TA" || getUserType() === "instructor";
};
