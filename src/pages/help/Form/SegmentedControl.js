import React from "react";
import { Form, Radio } from "antd";

const SegmentedControl = ({ value, option1, value1, option2, value2 }) => {
  return (
    <Form.Item name={value}>
      <Radio.Group buttonStyle="solid" className="control">
        <Radio.Button value={value1}>{option1}</Radio.Button>
        <Radio.Button value={value2}>{option2}</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default SegmentedControl;
