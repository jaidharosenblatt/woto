import React from "react";
import { Row, Space } from "antd";
import attributeIconMap from "./attributeIconMap";
import "./CollapsedQuestion.css";
import { renderCommonItem } from "../../../util/getCommonValues";
/**
 * Renders a vertical list of icontags based on const attributeIconMap
 * @param details question submission to map through
 * @param highlightKeys field keys to highlight blue
 * @param words (optional) switch to using field names instead of icons
 */
const CollapsedQuestion = ({ name, details, highlightKeys, words }) => {
  const firstName = name.split(" ")[0];
  if (!details) {
    return <p> {firstName} did not submit a question </p>;
  }
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
          <strong
            style={{
              textTransform: "capitalize",
              color: "#262626",
              whiteSpace: "nowrap",
            }}
          >
            {attributeIconMap(attribute).icon}
            {words && ` ${attributeIconMap(attribute).label}:`}
          </strong>

          {renderCommonItem(value, highlightKeys)}
        </Space>
      </Row>
    );
  };

  const blockedKeys = ["collaborate", "roomName"];
  const questionKeys = Object.keys(details);
  const questionKeysFiltered = questionKeys.filter(
    (key) => details[key] !== undefined && !blockedKeys.includes(key)
  );

  return (
    <Space direction="vertical" align="left">
      {questionKeysFiltered.map((key) => {
        return <IconTag key={key} attribute={key} value={details[key]} />;
      })}
    </Space>
  );
};
export default CollapsedQuestion;
