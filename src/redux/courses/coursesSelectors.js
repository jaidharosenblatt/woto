import { defaultFields } from "../../components/course/helpform/defaultFields";

/**
 * @function
 * Get course from courses store or sorted Courses
 * @param {Object} store - Redux store
 * @returns {Object} course
 */
const getCourse = (store) => {
  const courseID = store.currentCourse;
  if (courseID in store.courses) {
    return store.courses[courseID];
  } else {
    return store.sortedCourses.find((course) => course._id === courseID);
  }
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Session or undefined if there is none
 */
const getSession = (store) => {
  const course = getCourse(store);
  return course?.session;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Question
 */
const getActiveQuestion = (store) => {
  return getCourse(store)?.activeQuestion;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Array} Discussions
 */
const getDiscussions = (store) => {
  const course = getCourse(store);
  return course?.discussions ? course?.discussions : [];
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Array} Questions
 */
const getQuestions = (store) => {
  const course = getCourse(store);
  return course?.questions ? course?.questions : [];
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Discussion
 */
const getActiveDiscussion = (store) => {
  return getCourse(store)?.activeDiscussion;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Stats
 */
const getStats = (store) => {
  return getCourse(store)?.stats;
};

/**
 * @function getQuestionTemplate Get question template for active course
 * Get session first, then course, then default fields
 * @param {Object} store - Redux store
 * @returns {Array} QuestionTemplate
 */
const getQuestionTemplate = (store) => {
  const course = getCourse(store);
  const session = getSession(store);

  if (session?.questionTemplate) {
    return session.questionTemplate;
  }
  return course.questionTemplate?.length !== 0
    ? course.questionTemplate
    : defaultFields;
};

/**
 * @function
 * Get description from either question or discussion
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Description
 */
const getDescription = (store) => {
  const course = getCourse(store);
  let description;
  if (course?.activeDiscussion) {
    description = course?.activeDiscussion?.description;
  }
  if (course?.activeQuestion) {
    description = course?.session?.activeQuestion?.description;
  }
  return description;
};

export default {
  getCourse,
  getSession,
  getActiveQuestion,
  getActiveDiscussion,
  getStats,
  getDiscussions,
  getQuestions,
  getDescription,
  getQuestionTemplate,
};
