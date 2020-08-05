import React from "react";
import { Row, Space } from "antd";
import attributeIconMap from "./attributeIconMap";
import "./CollapsedQuestion.css";

/**
 * Renders a vertical list of icontags based on const attributeIconMap
 * @param details question submission to map through
 * @param highlightKeys field keys to highlight blue
 * @param words (optional) switch to using field names instead of icons
 */
const CollapsedQuestion = ({ details, highlightKeys, words }) => {
  const IconTag = ({ attribute, value, styler }) => {
    if (Array.isArray(value)) {
      value = value.join(", ");
    }

    return (
      <Row>
        <Space>
          <b style={{ textTransform: "capitalize", color: "#262626" }}>
            {attributeIconMap(attribute)}
            {words && ` ${attribute}:`}
          </b>

          <p style={styler ? { color: "#40a9ff" } : {}}>{value}</p>
        </Space>
      </Row>
    );
  };

  const blockedKeys = ["collaborate", "meetingURL"];
  const questionKeys = Object.keys(details);
  const questionKeysFiltered = questionKeys.filter(
    (key) => details[key] !== undefined && !blockedKeys.includes(key)
  );

  return (
    <Space direction="vertical">
      {questionKeysFiltered.map((key) => {
        return (
          <IconTag
            key={key}
            attribute={key}
            value={details[key]}
            styler={highlightKeys && highlightKeys.includes(key)}
          />
        );
      })}
    </Space>
  );
};
export default CollapsedQuestion;
