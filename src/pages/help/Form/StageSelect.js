import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

/**
 * @jaidharosenblatt prompts users to select their stage in the problem
 * from predefined options.
 */
const StageSelect = ({ name, label, placeholder }) => {
  return (
    <Form.Item name={name} label={label}>
      <Select allowClear placeholder={placeholder}>
        <Option value="justStarted">Just started the problem</Option>
        <Option value="understandProblem">
          Understand the problem but no solution
        </Option>
        <Option value="debuggingSolution">Debugging a solution</Option>
        <Option value="improvingSolution">Improving/checking a solution</Option>
      </Select>
    </Form.Item>
  );
};

export default StageSelect;
