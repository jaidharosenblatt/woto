import React from "react";
import { Tag } from "antd";
/**
 * Transform items into 5 tags
 * @param {*} items
 */
export const renderItemsToTags = (items) => {
  //Only render first 5 tags
  const slicedItems = items.slice(0, 5);
  const tags = [];
  for (let i = 0; i < slicedItems.length; i++) {
    tags.push(<Tag key={i}>{slicedItems[i]}</Tag>);
  }
  return <>{tags}</>;
};
