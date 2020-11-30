import API from "../api/API";
import { compareObjects } from "./getCommonValues";

/**
 * @function Sort discussions by first key then last active
 * @param {Array} discussions
 * @param {Object} description
 * @returns {Array} sorted discussions
 */
function sortDiscussionsByDescription(discussions, description) {
  if (!discussions || discussions.length === 0 || !description) {
    return discussions;
  }
  const temp = [...discussions];

  const key = Object.keys(description)[0];

  temp.sort((a, b) => {
    if (
      compareObjects(a.description, description, key) &&
      !compareObjects(b.description, description, key)
    ) {
      return -1;
    }
    if (
      compareObjects(b.description, description, key) &&
      !compareObjects(a.description, description, key)
    ) {
      return 1;
    } else {
      return a.updatedAt - b.updatedAt;
    }
  });

  return temp;
}

/**
 * Update the user's meeting url
 * @param {*} meetingURL
 */
const setMeetingURL = async (meetingURL) => {
  try {
    await API.editProfile({ meetingURL: meetingURL });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

export default { sortDiscussionsByDescription, setMeetingURL };
