import React from "react";
import "./components.css";

const IconTag = (props) => {
  return (
    <div className="IconTag">
      <img src={props.image} alt={props.alt} className="Icon" />
      {props.tag}
    </div>
  );
};

export default IconTag;
