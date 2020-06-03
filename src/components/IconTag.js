import React from "react";
import "./components.css";

const IconTag = (props) => {
  return (
    <div>
      <img className="Icon" src={props.image} />
      {props.locationName}
    </div>
  );
};

export default IconTag;
