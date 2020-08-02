import React from "react";
import { Row, Col, Space } from "antd";
import attributeIconMap from "./attributeIconMap";
import "./CollapsedQuestion.css";
/**
 * @jaidharosenblatt Renders a vertical list of icontags based on const attributeIconMap
 */

const IconTag = ({ attribute, value, styler }) => {
  if (Array.isArray(value)) {
    value = value.join(", ");
  }

  return (
    <Row>
      <Space size="middle">
        {attributeIconMap(attribute)}
        <p style={styler ? { color: "#40a9ff" } : {}}>{value}</p>
      </Space>
    </Row>
  );
};

const CollapsedQuestion = ({ details, joinedDiscussion }) => {
  const blockedKeys = ["collaborate", "meetingURL"];

  var questionKeysFiltered = [];
  if (details) {
    const questionKeys = Object.keys(details);
    questionKeysFiltered = questionKeys.filter(
      (key) => details[key] !== undefined && !blockedKeys.includes(key)
    );
  }

  var dicussionKeysFiltered = [];
  var similarKeys = [];
  if (joinedDiscussion) {
    const discussionKeys = Object.keys(joinedDiscussion.description);
    dicussionKeysFiltered = discussionKeys.filter(
      (key) => joinedDiscussion[key] !== undefined && !blockedKeys.includes(key)
    );
    details &&
      discussionKeys.forEach((key) => {
        if (details[key] === joinedDiscussion.description[key]) {
          similarKeys.push(key);
        }
      });
  }

  return (
    <>
      {joinedDiscussion ? (
        <>
          <Row gutter={[0, 20]}>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <h2 style={{ fontSize: "16px" }}>
                  {joinedDiscussion.name}'s Question
                </h2>
                {dicussionKeysFiltered.map((key) => {
                  return (
                    <IconTag
                      key={key}
                      attribute={key}
                      value={joinedDiscussion.description[key]}
                      styler={similarKeys.includes(key)}
                    />
                  );
                })}
              </Space>
            </Col>
            {details && (
              <Col xs={24} md={12}>
                <Space direction="vertical">
                  <h2 style={{ fontSize: "16px" }}> Your Question</h2>
                  {questionKeysFiltered.map((key) => {
                    return (
                      <IconTag
                        key={key}
                        attribute={key}
                        value={details[key]}
                        styler={similarKeys.includes(key)}
                      />
                    );
                  })}
                </Space>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <Space className="collapsed-question" direction="vertical">
          {questionKeysFiltered.map((key) => {
            return <IconTag key={key} attribute={key} value={details[key]} />;
          })}
        </Space>
      )}
    </>
  );
};
export default CollapsedQuestion;
