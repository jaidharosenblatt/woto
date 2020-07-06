import client from "../axiosConfig";

export const getInstitutions = async () => {
  let { data } = await client.get("/institutions");
  return data;
};

export const postCourses = async (course) => {
  let { data } = await client.post("/courses", course);
  return data;
};

export const courseEnroll = async (accessKey) => {
  let { data } = await client.post("/courses/enroll", accessKey);
  return data;
};

export default { getInstitutions, postCourses, courseEnroll };
