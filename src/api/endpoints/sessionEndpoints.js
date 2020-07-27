import client from "../axiosConfig";

export const openSession = async (courseid, session) => {
  let { data } = await client.post(`/courses/${courseid}/sessions`, session);
  return data;
};

export const getSession = async (courseid) => {
  let { data } = await client.get(`/courses/${courseid}/sessions`);
  return data;
};

export const joinSessionAsStaffer = async (courseid) => {
  let { data } = await client.post(`/courses/${courseid}/joinsessionAsStaffer`);
  return data;
};

export const closeSession = async (courseid) => {
  let { data } = await client.post(`/courses/${courseid}/closesession`);
  return data;
};

export default { openSession, getSession, joinSessionAsStaffer, closeSession };
