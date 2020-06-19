import React from "react";
import { Form, Select } from "antd";

/**
 * Temporary options
 */
const { Option } = Select;

/**
 * @jaidharosenblatt Select field that allows user to tag their responses
 * @param tags the tags from past answers
 */
const DataSelect = ({ mode, name, label, placeholder, options = [] }) => {
  return (
    <Form.Item name={name} label={label}>
      <Select mode={mode} style={{ width: "100%" }} placeholder={placeholder}>
        {options.map((option) => {
          return <Option key={option}>{option}</Option>;
        })}
      </Select>
    </Form.Item>
  );
};

export default DataSelect;
