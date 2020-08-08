// Find overlapping values between two question
export const getCommonValues = (myQuestion, theirQuestion) => {
  const blockedValues = ["NA"];
  const commonValues = [];

  if (!myQuestion || !theirQuestion) {
    return commonValues;
  }

  const discussionKeys = Object.keys(myQuestion);
  discussionKeys.forEach((key) => {
    let myValue = myQuestion[key];
    let theirValue = theirQuestion[key];

    // if array then check each value
    if (Array.isArray(myValue)) {
      let intersect = myValue.filter(
        (value) =>
          theirValue.includes(value) && !blockedValues.includes(myValue)
      );
      // if overlap then add value
      if (intersect.length > 0) {
        commonValues.push(...intersect);
      }
    }
    // if not an array then check exact value
    else if (myValue === theirValue && !blockedValues.includes(myValue)) {
      commonValues.push(myValue);
    }
  });
  return commonValues;
};