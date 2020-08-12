import React from "react";
import { Tag } from "antd";

// Filter out discussions that don't have matching key to description
// Get # students matching
export const getStudentCountByKey = (discussions, description, key) => {
  var studentCount = 0;
  if (!discussions || discussions.length === 0 || !description) {
    return studentCount;
  }
  discussions.forEach((discussion) => {
    if (compareObjects(discussion.description, description, key)) {
      studentCount += discussion.participants.length;
    }
  });
  return studentCount;
};

// Check if overlap between two values for first key
export function compareObjects(object, object1, key) {
  if (Array.isArray(object[key])) {
    const intersect = object[key].filter((value) =>
      object1[key].includes(value)
    );
    return intersect.length > 0;
  } else if (object[key] === object1[key]) {
    return true;
  }
  return false;
}

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

// Render tags or text in blue if common
export const renderCommonItem = (item, highlightedValues) => {
  if (!highlightedValues) {
    return <>{item}</>;
  }
  if (typeof value === "object") {
    return null;
  }
  if (Array.isArray(item)) {
    return (
      <>
        {item.map((option, i) => {
          return (
            <Tag
              style={{ marginBottom: 4 }}
              key={i}
              color={highlightedValues.includes(option) ? "blue" : "default"}
            >
              {option}
            </Tag>
          );
        })}
      </>
    );
  }
  if (highlightedValues.includes(item)) {
    return <p style={{ color: "#40A9FF" }}>{item}</p>;
  } else {
    return <>{item}</>;
  }
};
