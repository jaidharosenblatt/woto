import client from "../axiosConfig";

export const getStudentCourses = async () => {
  let { data } = await client.get("/students/courses/");
  return data;
};

export default { getStudentCourses };
