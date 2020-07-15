import client from "../axiosConfig";

const typeTerm = (type) => {
  return type === "instructor" ? "instructors" : "students";
};

export const getCourses = async (type) => {
  let { data } = await client.get(`/${typeTerm(type)}/courses/`);
  return data;
};

export const inviteEmails = async (courseid, emails) => {
  let { data } = await client.post(`/courses/${courseid}/invite`, emails);
  return data;
};

export default { getCourses, inviteEmails };
