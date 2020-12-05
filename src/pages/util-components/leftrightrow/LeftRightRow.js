import React from "react";
import "./left-right-row.css";
const LeftRightRow = ({ left, right }) => {
  return (
    <div className="left-right-row-container">
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </div>
  );
};

export default LeftRightRow;
