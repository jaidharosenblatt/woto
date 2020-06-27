import React from "react";
import { Tag } from "antd";

/**
 * @matthewsclar Component that displays tags
 * @param {options} tag, the name of a tag associated with the interaction
 * Returns either mobile tags in a vertical line or dekstop tags in horizontal line
 * Must use CSS to set display of one to none.
 */

const InteractionTags = ({ options }) => {
  const tags = [];
  options.forEach((option) => {
    tags.push(<Tag key={option}> {option} </Tag>);
  });

  return <div className="DesktopTags">{tags}</div>;
};

export default InteractionTags;
