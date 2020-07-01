import React from "react";
import { Row, Space } from "antd";
import attributeIconMap from "./attributeIconMap";
import "./CollapsedQuestion.css";
/**
 * @jaidharosenblatt Renders a vertical list of icontags based on const attributeIconMap
 */

const IconTag = ({ attribute, value }) => {
  return (
    <Row>
      <Space size="middle">
        {attributeIconMap(attribute)}
        <p>{value}</p>
      </Space>
    </Row>
  );
};

const CollapsedQuestion = ({ details }) => {
  const blockedKeys = ["isAssignment", "collaborate"];
  const questionKeys = Object.keys(details);
  const questionKeysFiltered = questionKeys.filter(
    (key) => details[key] !== undefined && !blockedKeys.includes(key)
  );
  console.log(questionKeysFiltered);
  return (
    <Space className="collapsed-question" direction="vertical">
      {questionKeysFiltered.map((key) => {
        return <IconTag key={key} attribute={key} value={details[key]} />;
      })}
    </Space>
  );
};
export default CollapsedQuestion;
