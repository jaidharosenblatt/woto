/**
 * @function getOrList
 * @param {Array} value
 * @returns list with or between each item
 */
export function getOrList(value) {
  if (!Array.isArray(value)) {
    return value;
  }
  let s = "";
  value.forEach((val, index) => {
    if (index === value.length - 2) {
      s += `${val} or `;
    } else if (index === value.length - 1) {
      s += val;
    } else {
      s += `${val}, `;
    }
  });
  return s;
}

/**
 * @returns ordinal suffix version of inputted number
 * ex 1 => 1st
 * Found in SO https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
 * @param i number to input
 */
function getOrdinalSuffix(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

/**
 * Get title for a user
 * @param {String} gradYear
 * @returns {String} title of user for staffers
 */
function getTitle(gradYear) {
  switch (gradYear) {
    case "instructor":
      return "Instructor";
    case "Graduate Student":
      return "Graduate Teaching Assistant";
    default:
      return "Undergraduate Teaching Assistant";
  }
}

export default {
  getOrdinalSuffix,
  getOrList,
  getTitle,
};
