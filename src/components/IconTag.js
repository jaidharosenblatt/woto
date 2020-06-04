import React from "react";
import "./components.css";

const IconTag = (props) => {
  return (
    <div>
      {props.image}
      {props.locationName}
    </div>
  );
};

export default IconTag;
