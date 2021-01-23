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
 * Close this question
 * @param {ObjectId} questionId
 * @returns {Question} removed
 */
export const closeQuestion = async (questionId) => {
  let { data } = await client.patch(`/questions/${questionId}/close`);
  return data;
};

/**
 * Help a student
 * @param {ObjectId} questionId question to help
 * @returns {Question} with help added
 */
export const helpStudent = async (questionId) => {
  let { data } = await client.patch(`/questions/${questionId}/help`);
  return data;
};

/**
 * Requeue a student's question (TA could not answer properly)
 * @param {ObjectId} questionId question to requeue
 * @returns {Question} edited
 */
export const requeueStudent = async (questionId) => {
  let { data } = await client.patch(`/questions/${questionId}/requeue`);
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
 * @param {*} sessionId
 */
export const getQuestions = async (sessionId) => {
  let { data } = await client.get(`/sessions/${sessionId}/questions/`);
  return data;
};

/**
 * Get stats for this session
 * @param {ObjectId} sessionId
 */
export const getStats = async (sessionId) => {
  let { data } = await client.get(`/sessions/${sessionId}/stats/`);
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
