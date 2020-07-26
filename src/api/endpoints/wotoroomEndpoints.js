import client from "../axiosConfig";

export const askWotoQuestion = async (courseid, details) => {
  let { data } = await client.post(`/courses/${courseid}/discussions`, details);
  return data;
};

export const getWotoData = async (courseid) => {
  let { data } = await client.get(`/courses/${courseid}/discussions`);
  return data;
};

export const joinDiscussion = async (discussionid) => {
  let { data } = await client.post(`/discussions/${discussionid}/join`);
  return data;
};

export const editDiscussion = async (discussionid, values) => {
  let { data } = await client.patch(`/discussions/${discussionid}`, values);
  return data;
};

export default { askWotoQuestion, getWotoData, joinDiscussion, editDiscussion };
