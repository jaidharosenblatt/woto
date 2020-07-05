import client from "../axiosConfig";

const typeTerm = (type) => {
  return type === "instructor" ? "instructors" : "students";
};

export const getCourses = async (type) => {
  let { data } = await client.get(`/${typeTerm(type)}/courses/`);
  return data;
};

export default { getCourses };
