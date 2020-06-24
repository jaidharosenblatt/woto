import React from "react";
import { Row, Space } from "antd";
import {
  FileOutlined,
  FormOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./CollapsedQuestion.css";
/**
 * @jaidharosenblatt Renders a vertical list of icontags based on const attributeIconMap
 * @param {details} assignment
 * @param {details} problem
 * @param {details} stage
 * @param {details} question
 */

const attributeIconMap = {
  assignment: <FileOutlined />,
  problem: <FormOutlined />,
  stage: <OrderedListOutlined />,
  question: <QuestionCircleOutlined />,
};

const IconTag = ({ attribute, value }) => {
  return (
    <Row>
      <Space size="middle">
        {attributeIconMap[attribute]}
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
