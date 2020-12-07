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
 * @function convertDiscussionsToColumns
 * Convert a discussions array into one that can be used by Ant Table
 * @param {Array} discussions
 * @param {String} userID from redux auth
 * @param {Array} questionTemplate
 * @returns {Array} new discussions
 */
const convertDiscussionsToColumns = (discussions, userID, questionTemplate) => {
  const filtered = discussions.filter(
    (discussion) =>
      !discussion.archived && !hasOldFields(questionTemplate, discussion)
  );
  return filtered.map((discussion, count) => {
    const owner =
      discussion.owner !== null
        ? discussion.owner
        : { _id: "1234", name: "Instructor" };
    const isYou = owner?._id === userID;

    const participants = discussion.participants.filter((item) => item.active);

    return {
      key: count,
      name: discussion.description.roomName,
      owner,
      id: discussion._id,
      isYou: isYou,
      lastActive: new Date(discussion.updatedAt),
      size: participants.length,
      participants: participants,

      description: discussion.description,
      discussion: discussion,
      ...discussion.description,
    };
  });
};

/**
 * @function hasOldFields
 * Check whether this discussion used an old questionTemplate
 * @param {Array} questionTemplate
 * @param {Object} discussion
 * @returns {Boolean} whether or not old fields exist
 */
function hasOldFields(questionTemplate, discussion) {
  const requiredFields = questionTemplate.filter((field) => field.required);
  requiredFields.forEach((field) => {
    const label = field?.label?.toLowerCase();
    const questionKeys = Object.keys(discussion.description);
    if (!questionKeys.includes(label)) {
      return true;
    }
  });

  return false;
}

function getCountsForFirstField(firstKey, filterValue, stats) {
  if (Array.isArray(filterValue)) {
    let max = 0;
    filterValue.forEach((value) => {
      if (stats.valueMap[firstKey]) {
        max = Math.max(stats.valueMap[firstKey][value], max);
      }
    });
    return max;
  }
  if (firstKey in stats.valueMap && filterValue in stats.valueMap[firstKey]) {
    return stats.valueMap[firstKey][filterValue];
  } else {
    return 0;
  }
}

export default {
  sortDiscussionsByDescription,
  convertDiscussionsToColumns,
  getCountsForFirstField,
};
