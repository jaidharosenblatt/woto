export function getTAStats(userId, questions) {
  if (!questions || questions.length === 0) {
    return { pieChart: false, helped: 0, waiting: 0, averageLength: 0 };
  }
  const myQuestions = questions.filter(
    (question) => question.assistant?.id === userId
  );
  const activeQuestions = questions.filter(
    (question) => question.active && !question.assistant && question.description
  );

  const averageLength = getAverageLength(myQuestions);
  var averageLengthMins = (averageLength / (1000 * 60 * 60)).toFixed(1);
  if (isNaN(averageLengthMins)) {
    averageLengthMins = 0;
  }

  const valueMap = getValueMap(activeQuestions);
  const nameValueMap = getNameValueMap(valueMap);

  return {
    pieChart: activeQuestions.length > 0 && nameValueMap,
    helped: myQuestions.length,
    waiting: activeQuestions.length,
    averageLength: averageLengthMins,
  };
}

function getAverageLength(questions) {
  var sum = 0;
  questions.forEach((question) => {
    const start = new Date(question.assistant.description.notifiedAt);
    const end = new Date(question.assistant.description.endedAt);
    const time = Math.abs(start - end);
    sum += time;
  });

  if (questions.length === 0 || sum === 0) {
    return 0;
  }
  return Math.ceil(sum / questions.length);
}

/**
 * Get counts of each type of question
 * @param {*} questions
 * @returns fields
 * Example:
 * assignment: {NA: 2, hw1: 2, hw2: 2}
 * concepts: {Array: 4, Linked List: 1}
 * stage: {Just started the problem: 3, NA: 2}
 */
function getValueMap(questions) {
  const fields = {};
  questions.forEach((question) => {
    const keys = Object.keys(question.description);
    keys.forEach((key) => {
      let value = question.description[key];
      // Add all values if it is an array
      if (Array.isArray(value)) {
        value.forEach((option) => addValuesToMap(key, option, fields));
      }
      // Otherwise just add single value
      else {
        addValuesToMap(key, value, fields);
      }
    });
  });
  return fields;
}

function addValuesToMap(key, value, fields) {
  let options = {};
  // initialize a new field with the option based on this question
  if (!(key in fields)) {
    options[value] = 1;
    fields[key] = options;
  } else {
    // Add to existing option
    if (value in fields[key]) {
      fields[key][value] += 1;
    }
    // Initialize a new option for existing field
    else {
      fields[key][value] = 1;
    }
  }
}

/**
 * Get averages from a value map
 * @param {*} valueMap
 * @returns {averageMap}
 * Example:
 * assignment: {NA: "0.33", hw1: "0.33", hw2: "0.33"}
 * concepts: {Array: "0.80", Linked List: "0.20"}
 * stage: {Just started the problem: "0.60", NA: "0.40"}
 */
export function getAveragesFromValueMap(valueMap) {
  const averageMap = {};
  const valueKeys = Object.keys(valueMap);
  valueKeys.forEach((fieldKey) => {
    const field = valueMap[fieldKey];
    const keys = Object.keys(field);
    let averages = {};
    let sum = 0;
    // Get total submissions for this field
    keys.forEach((key) => {
      sum += field[key];
    });
    keys.forEach((key) => {
      let average = (field[key] / sum).toFixed(2);
      averages[key] = average;
    });
    averageMap[fieldKey] = averages;
  });

  return averageMap;
}

function getNameValueMap(valueMap) {
  const nameValueMap = {};
  const fieldKeys = Object.keys(valueMap);
  fieldKeys.forEach((fieldKey) => {
    const value = valueMap[fieldKey];
    const optionKeys = Object.keys(valueMap[fieldKey]);
    const options = optionKeys.map((key) => {
      return { name: key, value: value[key] };
    });
    nameValueMap[fieldKey] = options;
  });
  return nameValueMap;
}
