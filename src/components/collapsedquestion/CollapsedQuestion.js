import React from "react";
import { Row, Space } from "antd";
import attributeIconMap from "./attributeIconMap";
import "./CollapsedQuestion.css";
import { renderCommonItem } from "../../utilfunctions/getCommonValues";
/**
 * Renders a vertical list of icontags based on const attributeIconMap
 * @param details question submission to map through
 * @param highlightKeys field keys to highlight blue
 * @param words (optional) switch to using field names instead of icons
 */
const CollapsedQuestion = ({ details, highlightKeys, words }) => {
  const IconTag = ({ attribute, value }) => {
    if (Array.isArray(value)) {
      value = value.join(", ");
    }

    if (typeof value === "object") {
      return null;
    }

    return (
      <Row>
        <Space align="baseline">
          <b
            style={{
              textTransform: "capitalize",
              color: "#262626",
              whiteSpace: "nowrap",
            }}
          >
            {attributeIconMap(attribute)}
            {words && ` ${attribute}:`}
          </b>

          {renderCommonItem(value, highlightKeys)}
        </Space>
      </Row>
    );
  };

  const blockedKeys = ["collaborate", "meetingURL", "roomName"];
  const questionKeys = Object.keys(details);
  const questionKeysFiltered = questionKeys.filter(
    (key) => details[key] !== undefined && !blockedKeys.includes(key)
  );

  return (
    <Space direction="vertical">
      {questionKeysFiltered.map((key) => {
        return <IconTag key={key} attribute={key} value={details[key]} />;
      })}
    </Space>
  );
};
export default CollapsedQuestion;
