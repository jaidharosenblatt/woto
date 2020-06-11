import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const StageSelect = ({ name, label, placeholder }) => {
  return (
    <Form.Item name={name} label={label}>
      <Select allowClear placeholder={placeholder}>
        <Option value="justStarted">Just started</Option>
        <Option value="understandProblem">
          Understand problem but no solution
        </Option>
        <Option value="debuggingSolution">Debugging my solution</Option>
        <Option value="improvingSolution">
          Improving/checking my solution
        </Option>
      </Select>
    </Form.Item>
  );
};

export default StageSelect;
