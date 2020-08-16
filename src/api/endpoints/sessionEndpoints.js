import client from "../axiosConfig";

/**
 * Open a new session for a course by its id
 * @param {*} courseid
 * @param {*} session session object with start and end time of session
 */
export const openSession = async (courseid, session) => {
  let { data } = await client.post(`/courses/${courseid}/sessions`, session);
  return data;
};

/**
 * Get session for a course
 * @param {*} courseid
 */
export const getSession = async (courseid) => {
  let { data } = await client.get(`/courses/${courseid}/sessions`);
  return data;
};

/**
 * Join an existing session for a course
 * @param {*} courseid
 */
export const joinSessionAsStaffer = async (courseid) => {
  let { data } = await client.post(`/courses/${courseid}/joinsessionAsStaffer`);
  return data;
};

/**
 * Archive a course's active session
 * @param {*} courseid
 */
export const closeSession = async (courseid) => {
  let { data } = await client.post(`/courses/${courseid}/closesession`);
  return data;
};

/**
 * Edit session information for a course's active session
 * @param {*} courseid
 * @param {*} changes validated changed to the session
 */
export const editSession = async (courseid, changes) => {
  let { data } = await client.patch(`/courses/${courseid}/sessions`, changes);
  return data;
};

/**
 * Join the questions queue for a course
 * @param {*} courseid
 */
export const postQuestion = async (courseid) => {
  let { data } = await client.post(`/courses/${courseid}/questions`, {});
  return data;
};

/**
 * Join the questions queue for a course
 * @param {*} courseid
 */
export const patchQuestion = async (questionId, changes) => {
  let { data } = await client.patch(`/questions/${questionId}`, changes);
  return data;
};

/**
 * Get questions user asked for this sesison
 * @param {*} courseid
 */
export const getMyQuestion = async (courseid) => {
  let { data } = await client.get(`/courses/${courseid}/questions/me`);
  return data;
};

/**
 * Get questions asked in this session
 * @param {*} courseid
 */
export const getQuestions = async (courseid) => {
  let { data } = await client.get(`/sessions/${courseid}/questions/`);
  return data;
};

export default {
  openSession,
  getSession,
  joinSessionAsStaffer,
  closeSession,
  editSession,
  postQuestion,
  patchQuestion,
  getMyQuestion,
  getQuestions,
};
