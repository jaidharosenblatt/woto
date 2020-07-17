import client from "../axiosConfig";
import { getUserType } from "./authEndpoints";

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

export default { getCourses, inviteEmails, unenroll };
