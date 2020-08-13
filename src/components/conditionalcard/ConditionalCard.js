import React from "react";
import { Card } from "antd";

/**
 * Render card or normal children
 * @param {props} children
 * @param {props} hide
 */
const ConditionalCard = (props) => {
  return (
    <>
      {props.hide ? (
        <div style={{ margin: 8 }}>{props.children}</div>
      ) : (
        <Card>{props.children}</Card>
      )}
    </>
  );
};

export default ConditionalCard;
