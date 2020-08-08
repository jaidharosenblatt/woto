import React from "react";
import { Spin } from "antd";
import "./spinner.css";

/**
 * Wrap elements with loading screen and
 * set has loading
 * @param {props} children content to display on load
 * @param {props} loading state on whether page is loading
 * @param {props} centered optional to center nav
 */
const LoadingScreenNavBar = (props) => {
  return (
    <>
      {props.loading ? (
        <div
          className="nav-bar-spinner"
          style={props.centered ? { minHeight: "calc(100vh - 144px)" } : {}}
        >
          <Spin size="large" />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default LoadingScreenNavBar;
