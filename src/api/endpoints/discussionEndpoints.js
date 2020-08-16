import client from "../axiosConfig";

export const postDiscussion = async (courseid, details) => {
  let { data } = await client.post(`/courses/${courseid}/discussions`, details);
  return data;
};

export const getDiscussions = async (courseid) => {
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

export default {
  postDiscussion,
  getDiscussions,
  joinDiscussion,
  editDiscussion,
};
