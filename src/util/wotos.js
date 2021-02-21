import { compareObjects } from "./getCommonValues";
import { getOrList } from "./text";
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
    return {
      key: count,
      name: discussion.description.roomName,
      owner: discussion.owner,
      id: discussion._id,
      isYou: discussion.owner === userID,
      lastActive: new Date(discussion.updatedAt),
      size: discussion.participants.length,
      participants: discussion.participants,

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
  if (!questionTemplate || questionTemplate.length === 0) {
    return false;
  }
  const requiredFields = questionTemplate.filter((field) => field.required);
  let found = false;
  requiredFields.forEach((field) => {
    const label = field?.label?.toLowerCase();
    const questionKeys = Object.keys(discussion.description);
    if (!questionKeys.includes(label)) {
      found = true;
    }
  });

  return found;
}

/**
 * Find out how many students share the first field to your question
 * @param {Object} description
 * @param {Object} valueMap
 * @param {Integer} questionsLength
 * @returns {String} message based on how many students share your question
 */
function getWotoPrompt(description, valueMap, questionsLength) {
  const firstKey = description && Object.keys(description)[0];
  const firstValue = description && description[firstKey];
  const valueString = getOrList(firstValue);

  let total = 0;

  if (Array.isArray(firstValue)) {
    firstValue.forEach((value) => {
      if (valueMap[firstKey]) {
        total += valueMap[firstKey][value];
      }
    });
  }

  if (firstKey in valueMap && firstValue in valueMap[firstKey]) {
    total = valueMap[firstKey][firstValue];
  }
  // 2 since total includes user's own question
  if (total === 2) {
    return `There is 1 other student who has a question on ${valueString}`;
  }
  if (total > 2) {
    return `There are ${
      total - 1
    } students who have questions on ${valueString}`;
  }
  // 2 since questionsLength includes user's own question
  if (questionsLength === 2) {
    return `There is 1 other student in the queue with you`;
  }
  if (questionsLength > 2) {
    return `There are ${questionsLength - 1} students in the queue with you`;
  }
}

export default {
  sortDiscussionsByDescription,
  convertDiscussionsToColumns,
  getWotoPrompt,
};
