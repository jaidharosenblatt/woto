import React from "react";
import { Form, Radio } from "antd";

/**
 * Segmented control with two options
 * @param name the name of the field to output
 * @param onClick function to call on click
 * @param value1 value of option 1
 * @param value2 value of option 2

 */
const SegmentedControl = ({
  name,
  onClick,
  option1,
  value1,
  option2,
  value2,
}) => {
  return (
    <Form.Item name={name} onClick={onClick}>
      <Radio.Group buttonStyle="solid" className="control">
        <Radio.Button value={value1}>{option1}</Radio.Button>
        <Radio.Button value={value2}>{option2}</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default SegmentedControl;
