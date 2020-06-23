import React from "react";
import { Row, Space } from "antd";
import {
  AssignmentIcon,
  PageIcon,
  ListIcon,
  HelpIcon,
} from "../../static/Images";
import "./CollapsedQuestion.css";
/**
 * @jaidharosenblatt Renders a vertical list of icontags based on const attributeIconMap
 * @param {details} assignment
 * @param {details} problem
 * @param {details} stage
 * @param {details} question
 */

const attributeIconMap = {
  assignment: AssignmentIcon,
  problem: PageIcon,
  stage: ListIcon,
  question: HelpIcon,
};

const IconTag = ({ attribute, value }) => {
  return (
    <Row>
      <Space size="middle">
        <img src={attributeIconMap[attribute]} />
        <p>{value}</p>
      </Space>
    </Row>
  );
};

const CollapsedQuestion = ({ details }) => {
  return (
    <Space className="collapsed-question" direction="vertical">
      {Object.keys(details).map((key) => {
        return <IconTag key={key} attribute={key} value={details[key]} />;
      })}
    </Space>
  );
};
export default CollapsedQuestion;
