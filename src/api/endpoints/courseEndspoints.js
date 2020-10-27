import client from "../axiosConfig";
import { getUserType } from "../tokenService";

const type = getUserType();

const typeTerm = (type) => {
  return type === "instructor" ? "instructors" : "students";
};

export const getCourses = async () => {
  let { data } = await client.get(`/${typeTerm(type)}/courses/`);
  return data;
};

/**
 * Unenroll from a course based on its id
 * @param {*} courseId
 */
export const unenroll = async (courseId) => {
  let { data } = await client.delete(`/courses/${courseId}/unenroll/`);
  return data;
};

export const inviteEmails = async (courseid, emails) => {
  let { data } = await client.post(`/courses/${courseid}/invite`, emails);
  return data;
};

/**
 * Get a course from ID
 * @param {*} courseId
 */
export const getCourse = async (courseid) => {
  let { data } = await client.get(`/courses/admin/${courseid}`);
  return data;
};

/**
 * Update the questionTemplate attritbute for courses
 * @param {*} courseId
 */
export const updateTemplate = async (courseid, template) => {
  let { data } = await client.patch(`/courses/admin/${courseid}`, template);
  return data;
};

/**
 * Update a course from course settings
 * @param {*} courseId
 */
export const editCourse = async (courseid, newSettings) => {
  let { data } = await client.patch(`/courses/admin/${courseid}`, newSettings);
  return data;
};

/**
 * Get a courses GENERAL KEY from database
 * @param {*} courseId
 */
export const getGeneralKey = async (courseid) => {
  let { data } = await client.get(`/courses/admin/generalkey/${courseid}`);
  return data;
};

/**
 * Get students for a course
 * @param {*} courseId
 */
export const getStudents = async (courseId) => {
  let { data } = await client.get(`/courses/${courseId}/students`);
  return data;
};

/**
 * Get students for a course
 * @param {*} courseId
 */
export const promoteAssistant = async (courseId, studentId) => {
  let { data } = await client.post(`/courses/${courseId}/assistants`, [{
    assistant_id: studentId,
  }]);
  return data;
};

/**
 * Make an announcement for a course
 * @param {*} courseId 
 * @param {*} message - message user wishes to display
 * @param {*} ownerName - name of the user making the announcement
 */
export const makeAnnouncement = async (courseId, message, ownerName) => {
  let { data } = await client.post(`/courses/${courseId}/announcements`, {
    announcement: message,
    ownerName
  });
  return data;
};

/**
 * Pin an announcment
 * @param {*} announcementId 
 */
export const pinAnnouncement = async (announcementId) => {
  let { data } = await client.patch(`/announcements/${announcementId}`, {
    pinned: true
  });
  return data;
};

/**
 * Unpin an announcement
 * @param {*} announcementId 
 */
export const unpinAnnouncement = async (announcementId) => {
  let { data } = await client.patch(`/announcements/${announcementId}`, {
    pinned: false
  });
  return data;
};

/**
 * Close an announcement
 * @param {*} announcementId 
 */
export const closeAnnouncement = async (announcementId) => {
  let { data } = await client.patch(`/announcments/${announcementId}`, {
    active: false
  });
  return data;
};

export default {
  getCourses,
  inviteEmails,
  unenroll,
  updateTemplate,
  editCourse,
  getGeneralKey,
  getCourse,
  getStudents,
  promoteAssistant,
  makeAnnouncement,
  pinAnnouncement,
  unpinAnnouncement,
  closeAnnouncement
};
