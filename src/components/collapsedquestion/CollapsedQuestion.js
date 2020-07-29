import React from "react";
import { Row, Col, Space } from "antd";
import attributeIconMap from "./attributeIconMap";
import "./CollapsedQuestion.css";
/**
 * @jaidharosenblatt Renders a vertical list of icontags based on const attributeIconMap
 */

const IconTag = ({ attribute, value, styler }) => {
  console.log(typeof value);
  if (Array.isArray(value)) {
    value = value.join(", ");
  }

  if (styler) {
    return (
      <Row>
        <Space size="middle">
          {attributeIconMap(attribute)}
          <p style={{ color: "#40a9ff" }}>{value}</p>
        </Space>
      </Row>
    );
  } else {
    return (
      <Row>
        <Space size="middle">
          {attributeIconMap(attribute)}
          <p>{value}</p>
        </Space>
      </Row>
    );
  }
};

const CollapsedQuestion = ({ details, details2, name }) => {
  const blockedKeys = ["collaborate", "meetingURL"];
  const questionKeys = Object.keys(details);
  const questionKeysFiltered = questionKeys.filter(
    (key) => details[key] !== undefined && !blockedKeys.includes(key)
  );

  if (details2) {
    var similarKeys = [];
    const discussionKeys = Object.keys(details2);
    const dicussionKeysFiltered = discussionKeys.filter(
      (key) => details2[key] !== undefined && !blockedKeys.includes(key)
    );
    for (var i = 0; i < questionKeysFiltered.length; i++) {
      if (dicussionKeysFiltered.includes(questionKeysFiltered[i])) {
        similarKeys.push(questionKeysFiltered[i]);
      }
    }
  }

  return (
    <>
      {details2 ? (
        <>
          <Row gutter={[0, 20]}>
            <Col xs={24} lg={12}>
              <Space direction="vertical">
                <h2 style={{ fontSize: "16px" }}> Your Question</h2>
                {questionKeysFiltered.map((key) => {
                  if (similarKeys.includes(key)) {
                    return (
                      <IconTag
                        key={key}
                        attribute={key}
                        value={details[key]}
                        styler={true}
                      />
                    );
                  } else {
                    return (
                      <IconTag key={key} attribute={key} value={details[key]} />
                    );
                  }
                })}
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <Space direction="vertical">
                <h2 style={{ fontSize: "16px" }}> {name}'s Question </h2>
                {questionKeysFiltered.map((key) => {
                  if (similarKeys.includes(key)) {
                    return (
                      <IconTag
                        key={key}
                        attribute={key}
                        value={details[key]}
                        styler={true}
                      />
                    );
                  } else {
                    return (
                      <IconTag key={key} attribute={key} value={details[key]} />
                    );
                  }
                })}
              </Space>
            </Col>
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
