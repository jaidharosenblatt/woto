import React from "react";
import { Form, Radio } from "antd";

/**
 * @jaidharosenblatt Segmented control with two options
 * @param onChange function to call on change
 */
const SegmentedControl = ({
  name,
  onChange,
  option1,
  value1,
  option2,
  value2,
}) => {
  return (
    <Form.Item name={name}>
      <Radio.Group
        buttonStyle="solid"
        className="control"
        onChange={onChange}
        name={name}
      >
        <Radio.Button value={value1}>{option1}</Radio.Button>
        <Radio.Button value={value2}>{option2}</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default SegmentedControl;
