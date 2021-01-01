import React from "react";
import "./vertical-space.css";

/**
 * Div that (optionally centers) and adds margin between children
 * @param {Array} children to render within space
 * @param {Boolean} center whether or not to center space
 */
export default function VerticalSpace(props) {
  return (
    <div
      className="vertical-space"
      style={props.center ? { alignItems: "center" } : {}}
    >
      {props.children}
    </div>
  );
}
