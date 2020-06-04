import React from "react";
import "../components.css";

/**
 * @jaidharosenblatt Display an image and a tag
 * @param {image} props Image to display ex a map pin
 * @param {alt} props Alt text for the image
 * @param {tag} props Tag to display ex "Now - 4pm"
 */
const IconTag = (props) => {
  return (
    <div className="IconTag">
      <img src={props.image} alt={props.alt} className="Icon" />
      {props.tag}
    </div>
  );
};

export default IconTag;
