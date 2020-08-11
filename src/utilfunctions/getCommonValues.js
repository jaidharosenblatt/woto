import React from "react";
import { Tag } from "antd";

// Filter out discussions that don't have matching key to description
// Get # students matching
export const filterDiscussionsByKey = (discussions, description, key) => {
  var filtered = [];
  var studentCount = 0;
  if (!discussions || discussions.length === 0 || !description) {
    return { filtered, studentCount };
  }
  discussions.forEach((discussion) => {
    if (Array.isArray(discussion.description[key])) {
      const intersect = discussion.description[key].filter((value) =>
        description[key].includes(value)
      );

      if (intersect.length > 0) {
        studentCount += discussion.participants.length;
        filtered.push(discussion);
      }
    } else if (discussion.description[key] === description[key]) {
      filtered.push(discussion);
    }
  });
  return { filtered, studentCount };
};

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
